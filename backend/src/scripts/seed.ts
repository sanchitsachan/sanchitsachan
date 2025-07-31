import { PrismaClient, UserRole, RankingCategory, ArticleCategory } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create admin user
  const adminPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123456', 12);
  const admin = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@forexplatform.com' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@forexplatform.com',
      username: 'admin',
      firstName: 'Admin',
      lastName: 'User',
      password: adminPassword,
      role: UserRole.SUPER_ADMIN
    }
  });

  // Create sample users
  const users = [];
  for (let i = 1; i <= 10; i++) {
    const password = await bcrypt.hash('password123', 12);
    const user = await prisma.user.upsert({
      where: { email: `user${i}@example.com` },
      update: {},
      create: {
        email: `user${i}@example.com`,
        username: `user${i}`,
        firstName: `User`,
        lastName: `${i}`,
        password
      }
    });
    users.push(user);
  }

  // Sample brokers data
  const brokersData = [
    {
      name: 'IG Markets',
      website: 'https://www.ig.com',
      description: 'IG is a leading online trading provider with over 45 years of experience.',
      shortDescription: 'Leading CFD and spread betting provider with excellent platform',
      foundedYear: 1974,
      headquarters: 'London, UK',
      regulation: ['FCA (UK)', 'ASIC (Australia)', 'MAS (Singapore)'],
      minDeposit: 250,
      maxLeverage: '1:30',
      spreadsFrom: 0.6,
      tradingPlatforms: ['IG Trading Platform', 'MetaTrader 4', 'ProRealTime'],
      assetClasses: ['Forex', 'Indices', 'Commodities', 'Stocks', 'Cryptocurrencies'],
      paymentMethods: ['Credit Card', 'Debit Card', 'Bank Transfer', 'PayPal'],
      customerSupport: ['24/5 Phone', 'Live Chat', 'Email'],
      languages: ['English', 'Spanish', 'French', 'German', 'Italian'],
      isFeatured: true,
      logo: 'https://via.placeholder.com/200x100/007ACC/FFFFFF?text=IG'
    },
    {
      name: 'XTB',
      website: 'https://www.xtb.com',
      description: 'XTB is one of the largest stock exchange-listed FX & CFD brokers in the world.',
      shortDescription: 'Award-winning broker with competitive spreads and excellent education',
      foundedYear: 2002,
      headquarters: 'Warsaw, Poland',
      regulation: ['FCA (UK)', 'KNF (Poland)', 'CNMV (Spain)', 'CySEC (Cyprus)'],
      minDeposit: 0,
      maxLeverage: '1:30',
      spreadsFrom: 0.1,
      tradingPlatforms: ['xStation 5', 'MetaTrader 4'],
      assetClasses: ['Forex', 'Indices', 'Commodities', 'Stocks', 'ETFs'],
      paymentMethods: ['Credit Card', 'Bank Transfer', 'Skrill', 'Neteller'],
      customerSupport: ['24/5 Phone', 'Live Chat', 'Email'],
      languages: ['English', 'Polish', 'Spanish', 'Czech', 'German'],
      isFeatured: true,
      logo: 'https://via.placeholder.com/200x100/00A651/FFFFFF?text=XTB'
    },
    {
      name: 'OANDA',
      website: 'https://www.oanda.com',
      description: 'OANDA is a leading provider of online multi-asset trading services.',
      shortDescription: 'Trusted forex broker with transparent pricing and advanced tools',
      foundedYear: 1996,
      headquarters: 'Toronto, Canada',
      regulation: ['FCA (UK)', 'CFTC/NFA (US)', 'ASIC (Australia)', 'IIROC (Canada)'],
      minDeposit: 0,
      maxLeverage: '1:50',
      spreadsFrom: 0.8,
      tradingPlatforms: ['OANDA Trade', 'MetaTrader 4', 'TradingView'],
      assetClasses: ['Forex', 'Indices', 'Commodities', 'Bonds'],
      paymentMethods: ['Credit Card', 'Bank Transfer', 'PayPal'],
      customerSupport: ['24/5 Phone', 'Live Chat', 'Email'],
      languages: ['English', 'Japanese', 'Spanish', 'German'],
      isFeatured: true,
      logo: 'https://via.placeholder.com/200x100/003366/FFFFFF?text=OANDA'
    },
    {
      name: 'Plus500',
      website: 'https://www.plus500.com',
      description: 'Plus500 is a leading provider of Contracts for Difference (CFDs).',
      shortDescription: 'Simple and intuitive CFD trading platform',
      foundedYear: 2008,
      headquarters: 'Haifa, Israel',
      regulation: ['FCA (UK)', 'CySEC (Cyprus)', 'ASIC (Australia)', 'MAS (Singapore)'],
      minDeposit: 100,
      maxLeverage: '1:30',
      spreadsFrom: 0.6,
      tradingPlatforms: ['Plus500 WebTrader', 'Plus500 Mobile App'],
      assetClasses: ['Forex', 'Shares', 'Indices', 'Commodities', 'Cryptocurrencies'],
      paymentMethods: ['Credit Card', 'PayPal', 'Skrill', 'Bank Transfer'],
      customerSupport: ['24/7 Live Chat', 'Email'],
      languages: ['English', 'Spanish', 'German', 'French', 'Italian'],
      isFeatured: false,
      logo: 'https://via.placeholder.com/200x100/1E3A8A/FFFFFF?text=Plus500'
    },
    {
      name: 'eToro',
      website: 'https://www.etoro.com',
      description: 'eToro is a social trading and multi-asset brokerage company.',
      shortDescription: 'Social trading platform with copy trading features',
      foundedYear: 2007,
      headquarters: 'Tel Aviv, Israel',
      regulation: ['FCA (UK)', 'CySEC (Cyprus)', 'ASIC (Australia)'],
      minDeposit: 50,
      maxLeverage: '1:30',
      spreadsFrom: 1.0,
      tradingPlatforms: ['eToro Platform', 'eToro Mobile App'],
      assetClasses: ['Forex', 'Stocks', 'Indices', 'Commodities', 'Cryptocurrencies'],
      paymentMethods: ['Credit Card', 'PayPal', 'Skrill', 'Neteller', 'Bank Transfer'],
      customerSupport: ['Live Chat', 'Email', 'Help Center'],
      languages: ['English', 'Spanish', 'German', 'French', 'Italian'],
      isFeatured: true,
      logo: 'https://via.placeholder.com/200x100/40C4AA/FFFFFF?text=eToro'
    },
    {
      name: 'FXTM',
      website: 'https://www.forextime.com',
      description: 'FXTM is an award-winning global forex broker.',
      shortDescription: 'Award-winning broker with diverse account types',
      foundedYear: 2011,
      headquarters: 'Limassol, Cyprus',
      regulation: ['FCA (UK)', 'CySEC (Cyprus)', 'FSCA (South Africa)'],
      minDeposit: 10,
      maxLeverage: '1:30',
      spreadsFrom: 0.1,
      tradingPlatforms: ['MetaTrader 4', 'MetaTrader 5', 'FXTM Trader'],
      assetClasses: ['Forex', 'Indices', 'Commodities', 'Shares'],
      paymentMethods: ['Credit Card', 'Skrill', 'Neteller', 'Bank Transfer'],
      customerSupport: ['24/5 Phone', 'Live Chat', 'Email'],
      languages: ['English', 'Arabic', 'Spanish', 'Thai', 'Vietnamese'],
      isFeatured: false,
      logo: 'https://via.placeholder.com/200x100/F59E0B/FFFFFF?text=FXTM'
    }
  ];

  // Create brokers
  const brokers = [];
  for (const brokerData of brokersData) {
    const slug = brokerData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const broker = await prisma.broker.upsert({
      where: { slug },
      update: {},
      create: {
        ...brokerData,
        slug,
        overallRating: Math.random() * 2 + 3, // Random rating between 3-5
        totalReviews: Math.floor(Math.random() * 100) + 10
      }
    });
    brokers.push(broker);
  }

  // Create sample reviews
  const reviewTitles = [
    'Great platform, excellent execution',
    'Good spreads but customer service could be better',
    'Professional service and reliable platform',
    'User-friendly interface, perfect for beginners',
    'Advanced tools for experienced traders',
    'Competitive spreads and fast execution',
    'Excellent educational resources',
    'Mobile app is outstanding',
    'Great for long-term investing',
    'Perfect for day trading'
  ];

  const reviewContents = [
    'I have been trading with this broker for over a year and I am very satisfied with their service. The platform is stable and execution is fast.',
    'The spreads are competitive and the platform is user-friendly. However, customer support response time could be improved.',
    'Professional service with a wide range of trading instruments. The regulatory compliance gives me confidence in their operations.',
    'As a beginner, I found their educational resources very helpful. The demo account allowed me to practice before trading with real money.',
    'The advanced charting tools and technical indicators are excellent for technical analysis. Great for experienced traders.',
    'Fast execution and tight spreads make this broker ideal for scalping strategies. Very happy with the service.',
    'Their educational content is top-notch. Webinars and tutorials helped me improve my trading skills significantly.',
    'The mobile app is well-designed and allows me to trade on the go. All features from the desktop platform are available.',
    'Perfect for my long-term investment strategy. Wide range of instruments and competitive fees.',
    'Excellent for day trading with fast execution and reliable platform. Never experienced any significant downtime.'
  ];

  for (let i = 0; i < 50; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const randomBroker = brokers[Math.floor(Math.random() * brokers.length)];
    const randomTitle = reviewTitles[Math.floor(Math.random() * reviewTitles.length)];
    const randomContent = reviewContents[Math.floor(Math.random() * reviewContents.length)];
    
    try {
      await prisma.review.create({
        data: {
          userId: randomUser.id,
          brokerId: randomBroker.id,
          title: randomTitle,
          content: randomContent,
          rating: Math.floor(Math.random() * 3) + 3, // Rating between 3-5
          pros: ['Good execution', 'Competitive spreads', 'Reliable platform'],
          cons: ['Could improve customer service', 'Limited educational resources'],
          isApproved: true,
          upvotes: Math.floor(Math.random() * 20),
          downvotes: Math.floor(Math.random() * 5)
        }
      });
    } catch (error) {
      // Skip if user already reviewed this broker
      continue;
    }
  }

  // Create sample rankings
  const currentYear = new Date().getFullYear();
  for (const broker of brokers.slice(0, 5)) {
    await prisma.ranking.upsert({
      where: {
        brokerId_category_year_month: {
          brokerId: broker.id,
          category: RankingCategory.OVERALL,
          year: currentYear,
          month: null
        }
      },
      update: {},
      create: {
        brokerId: broker.id,
        category: RankingCategory.OVERALL,
        position: brokers.indexOf(broker) + 1,
        score: Math.random() * 20 + 80, // Score between 80-100
        year: currentYear,
        description: `Top ${brokers.indexOf(broker) + 1} broker for ${currentYear}`
      }
    });
  }

  // Create sample articles
  const articles = [
    {
      title: 'How to Choose the Right Forex Broker',
      slug: 'how-to-choose-right-forex-broker',
      content: 'Choosing the right forex broker is crucial for your trading success...',
      excerpt: 'A comprehensive guide on selecting the best forex broker for your trading needs.',
      author: 'Trading Expert',
      category: ArticleCategory.EDUCATION,
      tags: ['forex', 'broker selection', 'trading tips'],
      isPublished: true,
      isFeatured: true
    },
    {
      title: 'Understanding Forex Spreads and How They Affect Your Trading',
      slug: 'understanding-forex-spreads',
      content: 'Forex spreads are the difference between bid and ask prices...',
      excerpt: 'Learn about forex spreads and how they impact your trading costs.',
      author: 'Market Analyst',
      category: ArticleCategory.EDUCATION,
      tags: ['spreads', 'trading costs', 'forex basics'],
      isPublished: true,
      isFeatured: false
    }
  ];

  for (const articleData of articles) {
    await prisma.article.upsert({
      where: { slug: articleData.slug },
      update: {},
      create: articleData
    });
  }

  console.log('✅ Database seeding completed successfully!');
  console.log(`📊 Created:`);
  console.log(`   - 1 admin user`);
  console.log(`   - ${users.length} regular users`);
  console.log(`   - ${brokers.length} brokers`);
  console.log(`   - ~50 reviews`);
  console.log(`   - 5 rankings`);
  console.log(`   - ${articles.length} articles`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });