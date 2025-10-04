'use client';

import { useLanguage } from '../contexts/LanguageContext';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Instagram, Youtube, Send, Check, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function ContactPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    emailOrPhone: '',
    inquiryCategory: '',
    inquirySubject: '',
    inquiryContent: '',
    personalNumber: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          emailOrPhone: '',
          inquiryCategory: '',
          inquirySubject: '',
          inquiryContent: '',
          personalNumber: ''
        });
        setSubmitStatus('idle');
      }, 3000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: MapPin,
      label: 'Address',
      value: '서울특별시 마포구 상지길 55, 3층',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'contact@grigoent.co.kr',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+82) 02-6299-9229',
    },
    {
      icon: Clock,
      label: 'Business Hours',
      value: ['월-금: 09:00 - 18:00', '토-일: 10:00 - 16:00'],
    },
  ];

  const socialLinks = [
    {
      icon: Instagram,
      name: 'Instagram',
      href: 'https://instagram.com/grigo.ent',
      gradient: 'from-purple-500 via-pink-500 to-orange-500',
    },
    {
      icon: Youtube,
      name: 'YouTube',
      href: 'https://youtube.com/@grigo-ent',
      gradient: 'from-red-500 to-red-600',
    },
  ];

  return (
    <main className="min-h-screen bg-primary text-white pt-20 md:pt-24">
      {/* Hero Section */}
      <section className="pt-12 pb-16 md:pt-16 md:pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              {t('contactPage.hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-white/70">
              {t('contactPage.hero.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-[#3C3C3C] rounded-3xl p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Top Row: Name and Email/Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        {t('contact.form.name')}
                      </label>
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
                      <label className="block text-gray-400 text-sm mb-2">
                        {t('contact.form.emailOrPhone')}
                      </label>
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        {t('contact.form.category')}
                      </label>
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
                      <label className="block text-gray-400 text-sm mb-2">
                        {t('contact.form.subject')}
                      </label>
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
                    <label className="block text-gray-400 text-sm mb-2">
                      {t('contact.form.content')}
                    </label>
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
                    <label className="block text-gray-400 text-sm mb-2">
                      {t('contact.form.personalNumber')}
                    </label>
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
                    disabled={isSubmitting || submitStatus === 'success'}
                    className="w-full bg-white hover:bg-gray-100 text-black py-4 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        {t('contactPage.form.sending')}
                      </>
                    ) : submitStatus === 'success' ? (
                      <>
                        <Check className="w-5 h-5" />
                        {t('contactPage.form.success')}
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        {t('contact.form.submit')}
                      </>
                    )}
                  </button>

                  {/* Error Message */}
                  {submitStatus === 'error' && (
                    <div className="flex items-center gap-2 text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {t('contactPage.form.error')}
                    </div>
                  )}
                </form>
              </div>
            </motion.div>

            {/* Contact Info Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Contact Information */}
              <div>
                <h2 className="text-5xl md:text-8xl font-light mb-6 text-white">
                  {t('contact.title')}
                </h2>
                <p className="text-lg text-gray-400 leading-relaxed mb-12">
                  {t('contact.description').split('\n').map((line, index) => (
                    <span key={index}>
                      {line}
                      {index < t('contact.description').split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </p>

                <div className="space-y-3">
                  {contactInfo.map((info, index) => (
                    <div key={info.label} className="flex items-start space-x-4">
                      <div className="w-6 h-6 text-gray-400 mt-1">
                        <info.icon className="w-full h-full" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm mb-1">{info.label}</p>
                        {Array.isArray(info.value) ? (
                          <div className="text-primary-foreground space-y-1">
                            {info.value.map((line, i) => (
                              <p key={i}>{line}</p>
                            ))}
                          </div>
                        ) : (
                          <p className="text-primary-foreground">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Media */}
              {/* <div>
                <h3 className="text-2xl font-bold mb-6 text-white">
                  {t('contactPage.social.title')}
                </h3>

                <div className="space-y-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-center gap-4 p-4 rounded-lg bg-zinc-900/30 border border-white/5 hover:bg-zinc-900/50 hover:border-white/10 transition-all group"
                    >
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${social.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                        <social.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-white font-medium">{social.name}</div>
                    </motion.a>
                  ))}
                </div>
              </div> */}
              
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
