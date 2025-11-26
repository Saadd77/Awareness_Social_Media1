import { AdminState } from '../context/SimulationContext';

interface FeedPost {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
}

export function generateFeed(adminState: AdminState): FeedPost[] {
  const basePosts: FeedPost[] = [
    { id: 1, title: 'Trending Dance Challenge', description: 'Join millions doing the latest viral move', thumbnail: '💃' },
    { id: 2, title: 'Cute Puppy Compilation', description: 'Guaranteed to make you smile', thumbnail: '🐶' },
    { id: 3, title: 'Life Hack: Kitchen Edition', description: 'You won\'t believe this trick!', thumbnail: '🍳' },
    { id: 4, title: 'Gaming Highlights', description: 'Epic moments from top streamers', thumbnail: '🎮' },
    { id: 5, title: 'Fashion Trends 2025', description: 'What everyone is wearing now', thumbnail: '👗' },
  ];

  const americanPosts: FeedPost[] = [
    { id: 6, title: 'American Success Stories', description: 'Entrepreneurs who made it big', thumbnail: '🇺🇸' },
    { id: 7, title: 'USA Manufacturing Renaissance', description: 'American-made is back!', thumbnail: '🏭' },
    { id: 8, title: 'Patriotic Music Moments', description: 'Songs that celebrate freedom', thumbnail: '🎵' },
  ];

  const strongLeaderPosts: FeedPost[] = [
    { id: 9, title: 'Leadership Masterclass', description: 'What makes a powerful leader', thumbnail: '👔' },
    { id: 10, title: 'Decisive Action Wins', description: 'Strong decisions, strong results', thumbnail: '💪' },
    { id: 11, title: 'Alpha Mindset Tips', description: 'Take control of your destiny', thumbnail: '🦁' },
  ];

  const ouragePosts: FeedPost[] = [
    { id: 12, title: 'You Won\'t Believe This Scandal', description: 'Everything you thought was wrong!', thumbnail: '😱' },
    { id: 13, title: 'They\'re Lying To You', description: 'The truth they don\'t want you to see', thumbnail: '🚨' },
    { id: 14, title: 'This is UNACCEPTABLE', description: 'Why aren\'t more people talking about this?', thumbnail: '😡' },
  ];

  const wealthPosts: FeedPost[] = [
    { id: 15, title: 'Luxury Lifestyle Flex', description: 'Living the dream life', thumbnail: '💎' },
    { id: 16, title: '$10M Mansion Tour', description: 'See how the elite really live', thumbnail: '🏰' },
    { id: 17, title: 'Success & Wealth Secrets', description: 'Get rich or die trying', thumbnail: '💰' },
  ];

  const influencerPosts: FeedPost[] = [
    { id: 18, title: 'Celebrity Drama Breakdown', description: 'All the tea you need to know', thumbnail: '☕' },
    { id: 19, title: 'Influencer Life Vlog', description: 'A day in paradise', thumbnail: '🌴' },
    { id: 20, title: 'Product Haul: Must-Haves', description: 'I spent $5000 so you don\'t have to', thumbnail: '🛍️' },
  ];

  let feed = [...basePosts];

  if (adminState.proAmericanContent || adminState.nationalPride) {
    feed = [...feed, ...americanPosts];
  }

  if (adminState.strongLeaderContent) {
    feed = [...feed, ...strongLeaderPosts];
  }

  if (adminState.outrageBoost > 40) {
    feed = [...feed, ...ouragePosts];
  }

  if (adminState.wealthFlexing) {
    feed = [...feed, ...wealthPosts];
  }

  if (adminState.influencerObsession > 50) {
    feed = [...feed, ...influencerPosts];
  }

  const shuffled = feed.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 8);
}
