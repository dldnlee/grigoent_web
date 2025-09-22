'use client';

import { useState } from 'react';
import { MapPin, Mail, Phone, Clock } from 'lucide-react';
import { useLanguage } from '@/app/contexts/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    emailOrPhone: '',
    inquiryCategory: '',
    inquirySubject: '',
    inquiryContent: '',
    personalNumber: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="py-24 bg-primary text-primary-foreground" id="contact">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Side - Contact Info */}
          <div className="space-y-12">
            {/* Header */}
            <div>
              <h2 className="text-5xl md:text-8xl font-light mb-6">
                {t('contact.title')}
              </h2>
              <p className="text-lg text-gray-400 leading-relaxed">
                {t('contact.description').split('\n').map((line, index) => (
                  <span key={index}>
                    {line}
                    {index < t('contact.description').split('\n').length - 1 && <br />}
                  </span>
                ))}
              </p>
            </div>

            {/* Contact Information */}
            <div className="space-y-3">
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 text-gray-400 mt-1">
                  <MapPin className="w-full h-full" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Address</p>
                  <p className="text-primary-foreground">서울특별시 마포구 상지길 55, 3층</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 text-gray-400 mt-1">
                  <Mail className="w-full h-full" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Email</p>
                  <p className="text-primary-foreground">contact@grigoent.co.kr</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 text-gray-400 mt-1">
                  <Phone className="w-full h-full" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Phone</p>
                  <p className="text-primary-foreground">+82) 02-6299-9229</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 text-gray-400 mt-1">
                  <Clock className="w-full h-full" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Business Hours</p>
                  <div className="text-primary-foreground space-y-1">
                    <p>월-금: 09:00 - 18:00</p>
                    <p>토-일: 10:00 - 16:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div>
            <div className="bg-[#3C3C3C] rounded-3xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Top Row: Name and Email/Phone */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">이름</label>
                    <input
                      type="text"
                      name="name"
                      placeholder=""
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-[#595959] border-0 rounded-lg px-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">이메일 또는 전화번호</label>
                    <input
                      type="text"
                      name="emailOrPhone"
                      placeholder=""
                      value={formData.emailOrPhone}
                      onChange={handleChange}
                      className="w-full bg-[#595959] border-0 rounded-lg px-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Second Row: Inquiry Category and Subject */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">문의 카테고리</label>
                    <input
                      type="text"
                      name="inquiryCategory"
                      placeholder=""
                      value={formData.inquiryCategory}
                      onChange={handleChange}
                      className="w-full bg-[#595959] border-0 rounded-lg px-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">문의 제목</label>
                    <input
                      type="text"
                      name="inquirySubject"
                      placeholder=""
                      value={formData.inquirySubject}
                      onChange={handleChange}
                      className="w-full bg-[#595959] border-0 rounded-lg px-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Inquiry Content Field */}
                <div>
                  <label className="block text-gray-400 text-sm mb-2">문의사항</label>
                  <textarea
                    name="inquiryContent"
                    placeholder=""
                    rows={6}
                    value={formData.inquiryContent}
                    onChange={handleChange}
                    className="w-full bg-[#595959] border-0 rounded-lg px-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                    required
                  ></textarea>
                </div>

                {/* Personal Number Field */}
                <div>
                  <label className="block text-gray-400 text-sm mb-2">개인을 비밀번호 (영탈용)</label>
                  <input
                    type="text"
                    name="personalNumber"
                    placeholder=""
                    value={formData.personalNumber}
                    onChange={handleChange}
                    className="w-full bg-[#595959] border-0 rounded-lg px-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-white hover:bg-gray-100 text-black py-4 rounded-lg font-medium transition-all duration-300"
                >
                  문의 보내기
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}