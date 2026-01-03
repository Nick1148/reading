'use client';

import { useState } from 'react';
import Link from 'next/link';
import { UserPlus, Check, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Navbar, Footer } from '@/components/layout';

export default function RegisterPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    introduction: '',
    agreeTerms: false,
    agreePrivacy: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const isFormValid =
    formData.name &&
    formData.email &&
    formData.phone &&
    formData.department &&
    formData.agreeTerms &&
    formData.agreePrivacy;

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-16">
          <Card className="max-w-md w-full mx-4">
            <CardContent className="pt-12 pb-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <Check className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-h3 mb-2">가입 신청 완료!</h2>
              <p className="text-body text-muted-foreground mb-6">
                가입 신청이 완료되었습니다.
                <br />
                관리자 승인 후 이메일로 안내 드리겠습니다.
              </p>
              <div className="flex flex-col gap-3">
                <Button asChild>
                  <Link href="/">홈으로 돌아가기</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/meetings">모임 일정 보기</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-primary text-primary-foreground py-12 md:py-16">
          <div className="container">
            <div className="flex items-center gap-3 mb-4">
              <UserPlus className="h-8 w-8" />
              <h1 className="text-h1">회원가입</h1>
            </div>
            <p className="text-body-lg opacity-90 max-w-2xl">
              독서모임에 참여하고 싶으시다면 아래 양식을 작성해주세요.
              관리자 승인 후 모임에 참여하실 수 있습니다.
            </p>
          </div>
        </section>

        {/* Form */}
        <section className="py-8 md:py-12">
          <div className="container max-w-2xl">
            <Button variant="ghost" asChild className="gap-2 mb-6">
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
                홈으로
              </Link>
            </Button>

            <Card>
              <CardHeader>
                <CardTitle>신규 회원 신청서</CardTitle>
                <CardDescription>
                  모든 필수 항목을 입력해주세요. * 표시는 필수 입력 항목입니다.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      이름 <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="name"
                      placeholder="홍길동"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      이메일 <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@company.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                    <p className="text-caption text-muted-foreground">
                      회사 이메일을 사용해주세요.
                    </p>
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      연락처 <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="010-1234-5678"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      required
                    />
                  </div>

                  {/* Department */}
                  <div className="space-y-2">
                    <Label htmlFor="department">
                      소속 부서 <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="department"
                      placeholder="개발팀"
                      value={formData.department}
                      onChange={(e) =>
                        setFormData({ ...formData, department: e.target.value })
                      }
                      required
                    />
                  </div>

                  {/* Introduction */}
                  <div className="space-y-2">
                    <Label htmlFor="introduction">자기소개</Label>
                    <Textarea
                      id="introduction"
                      placeholder="간단한 자기소개와 독서모임에 참여하고 싶은 이유를 적어주세요."
                      value={formData.introduction}
                      onChange={(e) =>
                        setFormData({ ...formData, introduction: e.target.value })
                      }
                      rows={4}
                    />
                  </div>

                  {/* Agreements */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="agreeTerms"
                        checked={formData.agreeTerms}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, agreeTerms: checked as boolean })
                        }
                      />
                      <div className="space-y-1">
                        <Label htmlFor="agreeTerms" className="cursor-pointer">
                          이용약관에 동의합니다.{' '}
                          <span className="text-destructive">*</span>
                        </Label>
                        <p className="text-caption text-muted-foreground">
                          <Link href="/terms" className="underline">
                            이용약관 보기
                          </Link>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="agreePrivacy"
                        checked={formData.agreePrivacy}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, agreePrivacy: checked as boolean })
                        }
                      />
                      <div className="space-y-1">
                        <Label htmlFor="agreePrivacy" className="cursor-pointer">
                          개인정보처리방침에 동의합니다.{' '}
                          <span className="text-destructive">*</span>
                        </Label>
                        <p className="text-caption text-muted-foreground">
                          <Link href="/privacy" className="underline">
                            개인정보처리방침 보기
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={!isFormValid}
                  >
                    가입 신청하기
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
