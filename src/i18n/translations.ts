export type Language = 'en' | 'fr' | 'ar';

export const translations = {
  en: {
    nav: {
      home: 'Home',
      projects: 'Projects',
      about: 'About Us',
      contact: 'Contact',
    },
    hero: {
      title: 'NOVAYTEK',
      subtitle: 'IT Solutions',
      tagline: 'Transforming Ideas into Digital Reality',
      description: 'We deliver cutting-edge IT solutions tailored to your business needs. From web development to cloud infrastructure, we make technology work for you.',
      cta: 'Get Started',
      ctaSecondary: 'Learn More',
    },
    projects: {
      title: 'Our Projects',
      subtitle: 'Excellence in Every Line of Code',
      viewProject: 'View Project',
      items: [
        {
          title: 'E-Commerce Platform',
          description: 'A comprehensive online marketplace with advanced inventory management and seamless payment integration.',
          tech: 'React, Node.js, PostgreSQL',
        },
        {
          title: 'Healthcare Management System',
          description: 'Digital transformation of patient records and appointment scheduling for modern healthcare facilities.',
          tech: 'Vue.js, Express, MongoDB',
        },
        {
          title: 'Financial Analytics Dashboard',
          description: 'Real-time data visualization and reporting platform for financial institutions.',
          tech: 'React, Python, MySQL',
        },
        {
          title: 'IoT Smart City Solution',
          description: 'Integrated platform for managing urban infrastructure and public services through IoT devices.',
          tech: 'Angular, Java, PostgreSQL',
        },
        {
          title: 'Educational Learning Portal',
          description: 'Interactive e-learning platform with live classes, assessments, and progress tracking.',
          tech: 'Next.js, GraphQL, MongoDB',
        },
        {
          title: 'Cloud Migration Services',
          description: 'Successfully migrated enterprise applications to cloud infrastructure with zero downtime.',
          tech: 'AWS, Docker, Kubernetes',
        },
      ],
    },
    about: {
      title: 'About NOVAYTEK',
      subtitle: 'Your Trusted Technology Partner',
      mission: 'Our Mission',
      missionText: 'To empower businesses through innovative technology solutions that drive growth, efficiency, and digital transformation.',
      vision: 'Our Vision',
      visionText: 'To be the leading IT solutions provider, recognized for excellence, innovation, and unwavering commitment to client success.',
      values: 'Our Values',
      valueItems: [
        {
          title: 'Innovation',
          description: 'Constantly pushing boundaries with cutting-edge technologies',
        },
        {
          title: 'Quality',
          description: 'Delivering excellence in every project we undertake',
        },
        {
          title: 'Integrity',
          description: 'Building trust through transparency and ethical practices',
        },
        {
          title: 'Partnership',
          description: 'Working alongside clients to achieve their goals',
        },
      ],
      stats: {
        projects: 'Projects Completed',
        clients: 'Happy Clients',
        years: 'Years Experience',
        team: 'Team Members',
      },
    },
    contact: {
      title: 'Get In Touch',
      subtitle: "Let's Build Something Amazing Together",
      form: {
        name: 'Full Name',
        email: 'Email Address',
        phone: 'Phone Number',
        subject: 'Subject',
        message: 'Your Message',
        submit: 'Send Message',
        sending: 'Sending...',
        success: 'Message sent successfully! We will get back to you soon.',
        error: 'Failed to send message. Please try again.',
      },
      info: {
        address: 'Address',
        addressText: '123 Tech Avenue, Innovation District',
        email: 'Email',
        emailText: 'contact@novaytek.com',
        phone: 'Phone',
        phoneText: '+1 (555) 123-4567',
      },
    },
    footer: {
      rights: 'All rights reserved.',
      tagline: 'Building the future, one solution at a time.',
    },
  },
  fr: {
    nav: {
      home: 'Accueil',
      projects: 'Projets',
      about: 'À Propos',
      contact: 'Contact',
    },
    hero: {
      title: 'NOVAYTEK',
      subtitle: 'Solutions Informatiques',
      tagline: 'Transformer les Idées en Réalité Numérique',
      description: 'Nous fournissons des solutions informatiques de pointe adaptées aux besoins de votre entreprise. Du développement web à l\'infrastructure cloud, nous mettons la technologie à votre service.',
      cta: 'Commencer',
      ctaSecondary: 'En Savoir Plus',
    },
    projects: {
      title: 'Nos Projets',
      subtitle: 'L\'Excellence dans Chaque Ligne de Code',
      viewProject: 'Voir le Projet',
      items: [
        {
          title: 'Plateforme E-Commerce',
          description: 'Une marketplace en ligne complète avec gestion avancée des stocks et intégration de paiement transparente.',
          tech: 'React, Node.js, PostgreSQL',
        },
        {
          title: 'Système de Gestion de Santé',
          description: 'Transformation numérique des dossiers patients et planification des rendez-vous pour les établissements de santé modernes.',
          tech: 'Vue.js, Express, MongoDB',
        },
        {
          title: 'Tableau de Bord Analytique Financier',
          description: 'Plateforme de visualisation et de reporting de données en temps réel pour les institutions financières.',
          tech: 'React, Python, MySQL',
        },
        {
          title: 'Solution IoT Ville Intelligente',
          description: 'Plateforme intégrée pour gérer les infrastructures urbaines et les services publics via des appareils IoT.',
          tech: 'Angular, Java, PostgreSQL',
        },
        {
          title: 'Portail d\'Apprentissage Éducatif',
          description: 'Plateforme d\'apprentissage en ligne interactive avec cours en direct, évaluations et suivi des progrès.',
          tech: 'Next.js, GraphQL, MongoDB',
        },
        {
          title: 'Services de Migration Cloud',
          description: 'Migration réussie d\'applications d\'entreprise vers l\'infrastructure cloud sans temps d\'arrêt.',
          tech: 'AWS, Docker, Kubernetes',
        },
      ],
    },
    about: {
      title: 'À Propos de NOVAYTEK',
      subtitle: 'Votre Partenaire Technologique de Confiance',
      mission: 'Notre Mission',
      missionText: 'Autonomiser les entreprises grâce à des solutions technologiques innovantes qui favorisent la croissance, l\'efficacité et la transformation numérique.',
      vision: 'Notre Vision',
      visionText: 'Être le principal fournisseur de solutions informatiques, reconnu pour son excellence, son innovation et son engagement envers la réussite des clients.',
      values: 'Nos Valeurs',
      valueItems: [
        {
          title: 'Innovation',
          description: 'Repousser constamment les limites avec des technologies de pointe',
        },
        {
          title: 'Qualité',
          description: 'Offrir l\'excellence dans chaque projet que nous entreprenons',
        },
        {
          title: 'Intégrité',
          description: 'Bâtir la confiance par la transparence et les pratiques éthiques',
        },
        {
          title: 'Partenariat',
          description: 'Travailler aux côtés des clients pour atteindre leurs objectifs',
        },
      ],
      stats: {
        projects: 'Projets Réalisés',
        clients: 'Clients Satisfaits',
        years: 'Années d\'Expérience',
        team: 'Membres de l\'Équipe',
      },
    },
    contact: {
      title: 'Contactez-Nous',
      subtitle: 'Construisons Ensemble Quelque Chose d\'Extraordinaire',
      form: {
        name: 'Nom Complet',
        email: 'Adresse Email',
        phone: 'Numéro de Téléphone',
        subject: 'Sujet',
        message: 'Votre Message',
        submit: 'Envoyer le Message',
        sending: 'Envoi en cours...',
        success: 'Message envoyé avec succès ! Nous vous répondrons bientôt.',
        error: 'Échec de l\'envoi du message. Veuillez réessayer.',
      },
      info: {
        address: 'Adresse',
        addressText: '123 Avenue de la Technologie, Quartier de l\'Innovation',
        email: 'Email',
        emailText: 'contact@novaytek.com',
        phone: 'Téléphone',
        phoneText: '+1 (555) 123-4567',
      },
    },
    footer: {
      rights: 'Tous droits réservés.',
      tagline: 'Construire l\'avenir, une solution à la fois.',
    },
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      projects: 'المشاريع',
      about: 'من نحن',
      contact: 'اتصل بنا',
    },
    hero: {
      title: 'نوفايتك',
      subtitle: 'حلول تقنية المعلومات',
      tagline: 'تحويل الأفكار إلى واقع رقمي',
      description: 'نقدم حلول تقنية معلومات متطورة مصممة خصيصاً لتلبية احتياجات عملك. من تطوير الويب إلى البنية التحتية السحابية، نجعل التكنولوجيا تعمل من أجلك.',
      cta: 'ابدأ الآن',
      ctaSecondary: 'اعرف المزيد',
    },
    projects: {
      title: 'مشاريعنا',
      subtitle: 'التميز في كل سطر برمجي',
      viewProject: 'عرض المشروع',
      items: [
        {
          title: 'منصة التجارة الإلكترونية',
          description: 'سوق إلكتروني شامل مع إدارة متقدمة للمخزون وتكامل سلس للدفع.',
          tech: 'React, Node.js, PostgreSQL',
        },
        {
          title: 'نظام إدارة الرعاية الصحية',
          description: 'التحول الرقمي لسجلات المرضى وجدولة المواعيد للمنشآت الصحية الحديثة.',
          tech: 'Vue.js, Express, MongoDB',
        },
        {
          title: 'لوحة التحليلات المالية',
          description: 'منصة تصور وتقارير البيانات في الوقت الفعلي للمؤسسات المالية.',
          tech: 'React, Python, MySQL',
        },
        {
          title: 'حل إنترنت الأشياء للمدن الذكية',
          description: 'منصة متكاملة لإدارة البنية التحتية الحضرية والخدمات العامة من خلال أجهزة إنترنت الأشياء.',
          tech: 'Angular, Java, PostgreSQL',
        },
        {
          title: 'بوابة التعلم التعليمية',
          description: 'منصة تعليم إلكتروني تفاعلية مع فصول مباشرة وتقييمات وتتبع التقدم.',
          tech: 'Next.js, GraphQL, MongoDB',
        },
        {
          title: 'خدمات الانتقال السحابي',
          description: 'نجحنا في ترحيل تطبيقات المؤسسات إلى البنية التحتية السحابية دون توقف.',
          tech: 'AWS, Docker, Kubernetes',
        },
      ],
    },
    about: {
      title: 'عن نوفايتك',
      subtitle: 'شريكك التقني الموثوق',
      mission: 'مهمتنا',
      missionText: 'تمكين الشركات من خلال حلول تقنية مبتكرة تدفع النمو والكفاءة والتحول الرقمي.',
      vision: 'رؤيتنا',
      visionText: 'أن نكون مزود الحلول التقنية الرائد، المعترف به للتميز والابتكار والالتزام الثابت بنجاح العميل.',
      values: 'قيمنا',
      valueItems: [
        {
          title: 'الابتكار',
          description: 'دفع الحدود باستمرار بتقنيات متطورة',
        },
        {
          title: 'الجودة',
          description: 'تقديم التميز في كل مشروع نقوم به',
        },
        {
          title: 'النزاهة',
          description: 'بناء الثقة من خلال الشفافية والممارسات الأخلاقية',
        },
        {
          title: 'الشراكة',
          description: 'العمل جنباً إلى جنب مع العملاء لتحقيق أهدافهم',
        },
      ],
      stats: {
        projects: 'مشروع مكتمل',
        clients: 'عميل سعيد',
        years: 'سنوات الخبرة',
        team: 'عضو في الفريق',
      },
    },
    contact: {
      title: 'تواصل معنا',
      subtitle: 'لنبني شيئاً رائعاً معاً',
      form: {
        name: 'الاسم الكامل',
        email: 'البريد الإلكتروني',
        phone: 'رقم الهاتف',
        subject: 'الموضوع',
        message: 'رسالتك',
        submit: 'إرسال الرسالة',
        sending: 'جاري الإرسال...',
        success: 'تم إرسال الرسالة بنجاح! سنعاود الاتصال بك قريباً.',
        error: 'فشل إرسال الرسالة. يرجى المحاولة مرة أخرى.',
      },
      info: {
        address: 'العنوان',
        addressText: '123 شارع التقنية، حي الابتكار',
        email: 'البريد الإلكتروني',
        emailText: 'contact@novaytek.com',
        phone: 'الهاتف',
        phoneText: '4567-123 (555) 1+',
      },
    },
    footer: {
      rights: 'جميع الحقوق محفوظة.',
      tagline: 'بناء المستقبل، حل واحد في كل مرة.',
    },
  },
};
