'use client';

import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArtistSearch } from './components/ArtistSearch';
import { SectionHeader } from './components/SectionHeader';
import { DancerGrid } from './components/DancerGrid';
import { useSearch } from './hooks/useSearch';
import { Dancer, Team } from './types/dancer';

// Sample data - in a real app, this would come from an API
const sampleDancers: Dancer[] = [
  {
    id: '1',
    koreanName: '김마린',
    englishName: 'Marline Kim',
    specialty: 'Hip Hop',
    type: 'solo',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80',
    isVerified: true,
    monthlyListeners: 125000,
    followers: 98000,
    socialLinks: {
      instagram: '@marline_kim',
      youtube: '@marlinekim_official'
    }
  },
  {
    id: '2',
    koreanName: '박서연',
    englishName: 'Sarah Park',
    specialty: 'Contemporary',
    type: 'solo',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80',
    isVerified: true,
    monthlyListeners: 87000,
    followers: 76000,
    socialLinks: {
      instagram: '@sarah_park_dance'
    }
  },
  {
    id: '3',
    koreanName: '이준호',
    englishName: 'Alex Lee',
    specialty: 'Jazz',
    type: 'solo',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80',
    monthlyListeners: 54000,
    followers: 42000
  },
  {
    id: '4',
    koreanName: '최루나',
    englishName: 'Luna Choi',
    specialty: 'Ballet',
    type: 'solo',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80',
    isVerified: true,
    monthlyListeners: 156000,
    followers: 134000
  },
  {
    id: '5',
    koreanName: '강민수',
    englishName: 'Marcus Kang',
    specialty: 'Street Dance',
    type: 'solo',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    monthlyListeners: 203000,
    followers: 187000
  },
  {
    id: '6',
    koreanName: '정소피아',
    englishName: 'Sofia Jung',
    specialty: 'Latin',
    type: 'solo',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    monthlyListeners: 92000,
    followers: 78000
  }
];

const sampleTeams: Team[] = [
  {
    id: 't1',
    teamName: 'Velocity Crew',
    koreanName: '벨로시티 크루',
    specialty: 'Hip Hop',
    formedYear: 2020,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    isVerified: true,
    followers: 234000,
    members: sampleDancers.slice(0, 4)
  },
  {
    id: 't2',
    teamName: 'Phoenix Dance',
    koreanName: '피닉스 댄스',
    specialty: 'Contemporary',
    formedYear: 2019,
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
    isVerified: true,
    followers: 189000,
    members: sampleDancers.slice(1, 5)
  },
  {
    id: 't3',
    teamName: 'Urban Movement',
    specialty: 'Street Dance',
    formedYear: 2021,
    image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    followers: 145000,
    members: sampleDancers.slice(2, 6)
  }
];

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function ArtistsPage() {
  const { filteredDancers, filteredTeams, updateFilter, totalResults } = useSearch({
    dancers: sampleDancers,
    teams: sampleTeams
  });

  const soloDancers = filteredDancers.filter(dancer => dancer.type === 'solo');

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      className="min-h-screen bg-background text-foreground pt-40"
    >
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-semibold mb-6 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent"
            >
              OUR ARTISTS
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              세계적 수준의 전문 댄서들과 팀이 만들어내는 예술적 퍼포먼스를 만나보세요
            </motion.p>
          </div>

          {/* Search Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <ArtistSearch
              onSearch={(query) => updateFilter('query', query)}
              totalResults={totalResults}
              placeholder="Search artists by Korean or English name..."
            />
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-12 bg-card/50 backdrop-blur-sm">
              <TabsTrigger value="all">All Artists</TabsTrigger>
              <TabsTrigger value="solo">Solo Dancers</TabsTrigger>
              <TabsTrigger value="teams">Teams</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-12">
              {/* Solo Dancers Section */}
              <div>
                <SectionHeader
                  title="Solo Dancers"
                  count={soloDancers.length}
                  subtitle="Individual performers showcasing their unique artistry"
                />
                <DancerGrid
                  dancers={soloDancers}
                  onDancerClick={(dancer) => console.log('Clicked dancer:', dancer)}
                />
              </div>

              {/* Teams Section */}
              <div>
                <SectionHeader
                  title="Dance Teams"
                  count={filteredTeams.length}
                  subtitle="Collaborative ensembles creating synchronized masterpieces"
                />
                <DancerGrid
                  teams={filteredTeams}
                  onTeamClick={(team) => console.log('Clicked team:', team)}
                />
              </div>
            </TabsContent>

            <TabsContent value="solo">
              <SectionHeader
                title="Solo Dancers"
                count={soloDancers.length}
                subtitle="Individual performers showcasing their unique artistry"
              />
              <DancerGrid
                dancers={soloDancers}
                onDancerClick={(dancer) => console.log('Clicked dancer:', dancer)}
              />
            </TabsContent>

            <TabsContent value="teams">
              <SectionHeader
                title="Dance Teams"
                count={filteredTeams.length}
                subtitle="Collaborative ensembles creating synchronized masterpieces"
              />
              <DancerGrid
                teams={filteredTeams}
                onTeamClick={(team) => console.log('Clicked team:', team)}
              />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </motion.div>
  );
}