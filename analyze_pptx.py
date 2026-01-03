import zipfile
import xml.etree.ElementTree as ET
import re
import os
import shutil
import json

pptx_path = "[독서모임] 리딩퓨처 활동사진 및 영수증(24.4Q~) (1).pptx"
output_dir = "public/images/history"

def ensure_dir(directory):
    if not os.path.exists(directory):
        os.makedirs(directory)

def extract_pptx_data(path, out_dir):
    if not os.path.exists(path):
        print(f"File not found: {path}")
        return

    ensure_dir(out_dir)
    
    extracted_data = []

    try:
        with zipfile.ZipFile(path, 'r') as z:
            # 1. Map relationship IDs to filenames for each slide
            # slide_rels mapping: slide number -> { rId: media_filename }
            slide_rels = {}
            
            # Find all rels files
            rels_files = [f for f in z.namelist() if f.startswith('ppt/slides/_rels/slide') and f.endswith('.xml.rels')]
            
            for rel_file in rels_files:
                # Extract slide number from filename (e.g., ppt/slides/_rels/slide1.xml.rels -> 1)
                match = re.search(r'slide(\d+)', rel_file)
                if match:
                    slide_num = int(match.group(1))
                else:
                    continue

                xml_content = z.read(rel_file)
                root = ET.fromstring(xml_content)
                
                rels = {}
                for elem in root:
                    # Look for relationships to media
                    # Target might be like "../media/image1.jpeg"
                    target = elem.attrib.get('Target', '')
                    rid = elem.attrib.get('Id', '')
                    type_attr = elem.attrib.get('Type', '')
                    
                    if 'image' in type_attr or 'media' in target:
                        # Normalize path: ../media/image1.jpeg -> ppt/media/image1.jpeg
                        if target.startswith('../'):
                            target = 'ppt/' + target.split('../')[1]
                        elif target.startswith('media/'):
                            target = 'ppt/' + target
                            
                        rels[rid] = target
                
                slide_rels[slide_num] = rels

            # 2. Process Slides
            slides = [f for f in z.namelist() if f.startswith('ppt/slides/slide') and f.endswith('.xml')]
            slides.sort(key=lambda x: int(re.search(r'slide(\d+)', x).group(1)))

            print(f"Found {len(slides)} slides.")

            for i, slide_file in enumerate(slides):
                slide_num = int(re.search(r'slide(\d+)', slide_file).group(1))
                print(f"Processing Slide {slide_num}...")
                
                xml_content = z.read(slide_file)
                root = ET.fromstring(xml_content)
                
                # Extract Text
                text_content = []
                namespaces = {'a': 'http://schemas.openxmlformats.org/drawingml/2006/main'}
                
                # Broad text search
                for elem in root.iter():
                    if elem.tag.endswith('}t'):
                        if elem.text:
                            text_content.append(elem.text)
                
                # Extract Images (Blip)
                # <a:blip r:embed="rIdX">
                images = []
                for elem in root.iter():
                    if elem.tag.endswith('}blip'):
                        embed_attr = None
                        for k, v in elem.attrib.items():
                            if k.endswith('}embed'):
                                embed_attr = v
                                break
                        
                        if embed_attr and slide_num in slide_rels and embed_attr in slide_rels[slide_num]:
                            media_path = slide_rels[slide_num][embed_attr]
                            
                            # Extract the file
                            original_ext = os.path.splitext(media_path)[1]
                            new_filename = f"slide{slide_num}_{embed_attr}{original_ext}"
                            out_path = os.path.join(out_dir, new_filename)
                            
                            with z.open(media_path) as source, open(out_path, "wb") as target:
                                shutil.copyfileobj(source, target)
                            
                            images.append(f"/images/history/{new_filename}")

                # Organize Data
                
                # Heuristic to find Quarter info (e.g., '25.4Q')
                quarter = "Unknown"
                books = []
                
                for line in text_content:
                    if re.search(r'\d{2}\.[1-4]Q', line):
                        quarter = line.strip().replace("'", "").replace("’", "") # Normalize '25.4Q -> 25.4Q
                    elif len(line) > 1 and "리딩퓨처" not in line and "활동 사진" not in line:
                         # Assume other lines are book titles or descriptions
                         # Filter out common headers
                         books.append(line.strip())
                
                extracted_data.append({
                    "slide": slide_num,
                    "quarter": quarter,
                    "content": books, # Raw content lines
                    "images": list(set(images)) # Dedupe if same image used twice
                })

    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()

    # Save to file directly
    with open('ppt_extracted_data.json', 'w', encoding='utf-8') as f:
        json.dump(extracted_data, f, indent=2, ensure_ascii=False)
    print("Saved extracted data to ppt_extracted_data.json")

if __name__ == "__main__":
    extract_pptx_data(pptx_path, output_dir)
