'use client';

import Link from 'next/link';
import { BookOpen, Mail, MapPin, Phone } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const FOOTER_LINKS = {
  quickLinks: [
    { href: '/meetings', label: '모임 일정' },
    { href: '/board', label: '게시판' },
    { href: '/about', label: '소개' },
    { href: '/register', label: '회원가입' },
  ],
  resources: [
    { href: '/board?category=review', label: '독서 후기' },
    { href: '/board?category=photo', label: '모임 사진' },
    { href: '/about#faq', label: '자주 묻는 질문' },
  ],
} as const;

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <BookOpen className="h-6 w-6" />
              <span className="text-h5 font-semibold">독서모임</span>
            </Link>
            <p className="text-body-sm opacity-80">
              함께 읽고, 함께 성장하는
              <br />
              회사 독서 동아리입니다.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-label font-semibold">바로가기</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-sm opacity-80 hover:opacity-100 transition-opacity"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-label font-semibold">콘텐츠</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-sm opacity-80 hover:opacity-100 transition-opacity"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-label font-semibold">연락처</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-body-sm opacity-80">
                <Mail className="h-4 w-4" />
                <span>goaniklee@gmail.com</span>
              </li>
              <li className="flex items-center gap-2 text-body-sm opacity-80">
                <MapPin className="h-4 w-4" />
                <span>포항시 북구 양덕동</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-primary-foreground/20" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-caption opacity-60">
            &copy; {currentYear} 회사 독서모임. All rights reserved.
          </p>
          <div className="flex gap-4 text-caption opacity-60">
            <Link href="/privacy" className="hover:opacity-100">
              개인정보처리방침
            </Link>
            <Link href="/terms" className="hover:opacity-100">
              이용약관
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
