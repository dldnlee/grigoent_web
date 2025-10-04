'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/client';
import { getCurrentUser, signOut } from '@/app/utils/auth';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { Plus, LogOut, Edit, Trash2, X } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

interface CareerEntry {
  id: string;
  category: string;
  title: string;
  description: string | null;
  video_url: string | null;
  poster_url: string | null;
  is_featured: boolean;
  country: string | null;
  start_date: string | null;
  end_date: string | null;
  single_date: string | null;
  date_type: string;
  linked_user_id: string | null;
  created_at: string;
}

interface User {
  id: string;
  name: string;
  name_en: string;
  email: string;
  profile_image: string | null;
  type: string;
}

const CATEGORIES = [
  { value: 'choreography', label_en: 'Choreography', label_ko: '안무' },
  { value: 'performance', label_en: 'Performance', label_ko: '공연' },
  { value: 'advertisement', label_en: 'Advertisement', label_ko: '광고' },
  { value: 'tv', label_en: 'TV', label_ko: 'TV' },
  { value: 'workshop', label_en: 'Workshop', label_ko: '워크샵' },
];

export default function MyPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const [user, setUser] = useState<User | null>(null);
  const [careerEntries, setCareerEntries] = useState<CareerEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    video_url: '',
    poster_url: '',
    is_featured: false,
    country: 'Korea',
    date_type: 'single' as 'single' | 'range',
    single_date: '',
    start_date: '',
    end_date: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const authUser = await getCurrentUser();
        if (!authUser) {
          router.push('/login');
          return;
        }

        const supabase = createClient();

        // Fetch user profile
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', authUser.id)
          .single();

        if (userError) throw userError;
        setUser(userData);

        // Fetch career entries
        const { data: careerData, error: careerError } = await supabase
          .from('career_entries')
          .select('*')
          .eq('user_id', authUser.id)
          .order('created_at', { ascending: false });

        if (careerError) throw careerError;
        setCareerEntries(careerData || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const handleAddEntry = async () => {
    if (!user || !formData.title || !formData.category) return;

    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('career_entries')
        .insert([
          {
            user_id: user.id,
            category: formData.category,
            title: formData.title,
            description: formData.description || null,
            video_url: formData.video_url || null,
            poster_url: formData.poster_url || null,
            is_featured: formData.is_featured,
            country: formData.country,
            date_type: formData.date_type,
            single_date: formData.date_type === 'single' ? formData.single_date || null : null,
            start_date: formData.date_type === 'range' ? formData.start_date || null : null,
            end_date: formData.date_type === 'range' ? formData.end_date || null : null,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      // Add new entry to state
      setCareerEntries([data, ...careerEntries]);

      // Reset form and close modal
      setFormData({
        category: '',
        title: '',
        description: '',
        video_url: '',
        poster_url: '',
        is_featured: false,
        country: 'Korea',
        date_type: 'single',
        single_date: '',
        start_date: '',
        end_date: '',
      });
      setShowAddModal(false);
      setSelectedCategory('');
    } catch (error) {
      console.error('Error adding entry:', error);
      alert('Failed to add career entry');
    }
  };

  const handleDeleteEntry = async (id: string) => {
    if (!confirm('Are you sure you want to delete this entry?')) return;

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('career_entries')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Remove from state
      setCareerEntries(careerEntries.filter(entry => entry.id !== id));
    } catch (error) {
      console.error('Error deleting entry:', error);
      alert('Failed to delete entry');
    }
  };

  const openAddModal = (category?: string) => {
    if (category) {
      setFormData({ ...formData, category });
      setSelectedCategory(category);
    }
    setShowAddModal(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center pt-20 md:pt-24">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const getEntriesByCategory = (category: string) => {
    return careerEntries.filter(entry => entry.category === category);
  };

  return (
    <div className="min-h-screen bg-primary text-white pt-20 md:pt-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-zinc-950/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">{language === 'en' ? 'My Page' : '마이 페이지'}</h1>
          </div>
          <Button
            onClick={handleSignOut}
            variant="ghost"
            className="flex items-center gap-2 text-white/70 hover:text-white"
          >
            <LogOut className="w-4 h-4" />
            <span>{language === 'en' ? 'Sign Out' : '로그아웃'}</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Profile Section */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-4">{language === 'en' ? 'Profile' : '프로필'}</h2>
          <div className="bg-zinc-900 rounded-lg p-6">
            <div className="flex items-center gap-4">
              {user.profile_image ? (
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                  <Image
                    src={user.profile_image}
                    alt={user.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl font-bold">
                  {user.name.charAt(0)}
                </div>
              )}
              <div>
                <h3 className="text-lg font-semibold">{user.name}</h3>
                <p className="text-white/60">{user.email}</p>
                <p className="text-white/40 text-sm mt-1">Type: {user.type}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Career Entries by Category */}
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">{language === 'en' ? 'Career Entries' : '경력'}</h2>
            <Button
              onClick={() => openAddModal()}
              className="flex items-center gap-2 bg-white text-black hover:bg-white/90"
            >
              <Plus className="w-4 h-4" />
              <span>{language === 'en' ? 'Add Entry' : '추가'}</span>
            </Button>
          </div>

          {CATEGORIES.map((cat) => {
            const entries = getEntriesByCategory(cat.value);
            const label = language === 'en' ? cat.label_en : cat.label_ko;

            return (
              <div key={cat.value} className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-white/90">{label}</h3>
                  <Button
                    onClick={() => openAddModal(cat.value)}
                    variant="ghost"
                    size="sm"
                    className="text-white/60 hover:text-white"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add {cat.label_en}
                  </Button>
                </div>

                {entries.length === 0 ? (
                  <div className="bg-zinc-900/50 rounded-lg p-8 text-center text-white/40">
                    {language === 'en' ? `No ${cat.label_en.toLowerCase()} entries yet` : `${label} 항목이 없습니다`}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {entries.map((entry) => {
                      const date = entry.date_type === 'single'
                        ? entry.single_date
                        : `${entry.start_date} - ${entry.end_date}`;

                      return (
                        <div
                          key={entry.id}
                          className="bg-zinc-900 rounded-lg p-4 flex justify-between items-start hover:bg-zinc-800/90 transition-colors"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium text-white">{entry.title}</h4>
                              {entry.is_featured && (
                                <span className="text-xs bg-yellow-500/20 text-yellow-500 px-2 py-0.5 rounded">
                                  Featured
                                </span>
                              )}
                            </div>
                            {entry.description && (
                              <p className="text-white/60 text-sm mt-1">{entry.description}</p>
                            )}
                            <div className="flex gap-4 mt-2 text-xs text-white/40">
                              {date && <span>{date}</span>}
                              {entry.country && <span>{entry.country}</span>}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleDeleteEntry(entry.id)}
                              className="p-2 hover:bg-zinc-700 rounded transition-colors"
                            >
                              <Trash2 className="w-4 h-4 text-red-400" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Entry Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-zinc-900 border-b border-white/10 p-6 flex justify-between items-center">
              <h3 className="text-xl font-bold">{language === 'en' ? 'Add Career Entry' : '경력 추가'}</h3>
              <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-zinc-800 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Category */}
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-white"
                  disabled={!!selectedCategory}
                >
                  <option value="">Select category</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {language === 'en' ? cat.label_en : cat.label_ko}
                    </option>
                  ))}
                </select>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium mb-2">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-white"
                  placeholder="Enter title"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-white"
                  rows={3}
                  placeholder="Enter description"
                />
              </div>

              {/* Video URL */}
              <div>
                <label className="block text-sm font-medium mb-2">Video URL</label>
                <input
                  type="url"
                  value={formData.video_url}
                  onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                  className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-white"
                  placeholder="https://youtube.com/..."
                />
              </div>

              {/* Date Type */}
              <div>
                <label className="block text-sm font-medium mb-2">Date Type</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="single"
                      checked={formData.date_type === 'single'}
                      onChange={(e) => setFormData({ ...formData, date_type: 'single' })}
                      className="text-white"
                    />
                    <span>Single Date</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="range"
                      checked={formData.date_type === 'range'}
                      onChange={(e) => setFormData({ ...formData, date_type: 'range' })}
                      className="text-white"
                    />
                    <span>Date Range</span>
                  </label>
                </div>
              </div>

              {/* Date Fields */}
              {formData.date_type === 'single' ? (
                <div>
                  <label className="block text-sm font-medium mb-2">Date</label>
                  <input
                    type="date"
                    value={formData.single_date}
                    onChange={(e) => setFormData({ ...formData, single_date: e.target.value })}
                    className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-white"
                  />
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Start Date</label>
                    <input
                      type="date"
                      value={formData.start_date}
                      onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">End Date</label>
                    <input
                      type="date"
                      value={formData.end_date}
                      onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                      className="w-full bg-zinc-800 border border-white/10 rounded-lg px-3 py-2 text-white"
                    />
                  </div>
                </div>
              )}

              {/* Featured */}
              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.is_featured}
                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                    className="rounded"
                  />
                  <span className="text-sm">Mark as featured</span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleAddEntry}
                  className="flex-1 bg-white text-black hover:bg-white/90"
                  disabled={!formData.title || !formData.category}
                >
                  {language === 'en' ? 'Add Entry' : '추가'}
                </Button>
                <Button
                  onClick={() => setShowAddModal(false)}
                  variant="ghost"
                  className="flex-1"
                >
                  {language === 'en' ? 'Cancel' : '취소'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
