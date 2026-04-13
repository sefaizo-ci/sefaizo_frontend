import { Injectable, signal } from '@angular/core';
import { PageContent, PageSlug, ContentSection, FAQItem, ContentCard, StatItem, TeamMember, Testimonial } from '../models/cms.models';

@Injectable({
  providedIn: 'root'
})
export class CmsService {
  private pagesSignal = signal<PageContent[]>(this.generateAllPages());
  pages = this.pagesSignal.asReadonly();

  getPageBySlug(slug: PageSlug | string): PageContent | undefined {
    return this.pagesSignal().find(p => p.slug === slug);
  }

  updatePage(slug: string, updatedPage: Partial<PageContent>): void {
    const current = this.pagesSignal();
    const index = current.findIndex(p => p.slug === slug);
    if (index !== -1) {
      const updated = [...current];
      updated[index] = {
        ...updated[index],
        ...updatedPage,
        lastModified: new Date()
      };
      this.pagesSignal.set(updated);
    }
  }

  togglePublish(slug: string): void {
    const current = this.pagesSignal();
    const page = current.find(p => p.slug === slug);
    if (page) {
      const updated = current.map(p =>
        p.slug === slug
          ? { ...p, isPublished: !p.isPublished, lastModified: new Date() }
          : p
      );
      this.pagesSignal.set(updated);
    }
  }

  private generateAllPages(): PageContent[] {
    return [
      this.generateAboutPage(),
      this.generateCareersPage(),
      this.generatePressPage(),
      this.generateBlogPage(),
      this.generateBecomePartnerPage(),
      this.generateResourcesPage(),
      this.generatePricingPage(),
      this.generateSuccessStoriesPage(),
      this.generateHelpCenterPage(),
      this.generateContactPage(),
      this.generateFaqPage(),
      this.generateAccessibilityPage(),
      this.generatePrivacyPage(),
      this.generateTermsPage(),
      this.generateCookiesPage(),
      this.generateLegalPage()
    ];
  }

  private generateAboutPage(): PageContent {
    return {
      id: 'about',
      slug: 'about',
      title: 'À propos de SEFAIZO',
      subtitle: 'La première marketplace beauté en Côte d\'Ivoire',
      metaDescription: 'Découvrez SEFAIZO, la plateforme qui connecte les clients aux meilleurs professionnels de la beauté à Abidjan.',
      isPublished: true,
      lastModified: new Date(),
      sections: [
        {
          id: 's1',
          type: 'hero',
          title: 'Notre mission',
          content: 'SEFAIZO est née d\'un constat simple : il était difficile de trouver et réserver un professionnel de la beauté de confiance à Abidjan. Notre plateforme connecte désormais des milliers de clients aux meilleurs salons et freelances de la ville, en offrant une expérience de réservation simple, rapide et sécurisée.',
          image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800'
        },
        {
          id: 's2',
          type: 'stats',
          title: 'SEFAIZO en chiffres',
          stats: [
            { id: 'st1', value: '500+', label: 'Professionnels partenaires', icon: 'users' },
            { id: 'st2', value: '50 000+', label: 'Réservations effectuées', icon: 'calendar' },
            { id: 'st3', value: '10', label: 'Communes couvertes', icon: 'map' },
            { id: 'st4', value: '4.8/5', label: 'Note moyenne clients', icon: 'star' }
          ]
        },
        {
          id: 's3',
          type: 'cards',
          title: 'Nos valeurs',
          cards: [
            { id: 'c1', title: 'Qualité garantie', description: 'Chaque professionnel est vérifié et évalué par nos soins pour garantir une prestation de qualité.', icon: 'check-circle' },
            { id: 'c2', title: 'Transparence', description: 'Prix affichés, avis authentiques et informations vérifiées pour une confiance totale.', icon: 'eye' },
            { id: 'c3', title: 'Innovation', description: 'Une technologie de pointe pour simplifier la réservation et la gestion d\'agenda.', icon: 'lightbulb' },
            { id: 'c4', title: 'Proximité', description: 'Un service pensé pour Abidjan, adapté aux réalités locales et aux besoins de chacun.', icon: 'heart' }
          ]
        },
        {
          id: 's4',
          type: 'text',
          title: 'Notre vision',
          content: 'Nous ambitionnons de devenir la plateforme de référence pour les services beauté en Afrique de l\'Ouest. D\'ici 2027, SEFAIZO sera présent dans 5 pays et accompagnera plus d\'un million de rendez-vous beauté chaque année.'
        },
        {
          id: 's5',
          type: 'cta',
          title: 'Envie de nous rejoindre ?',
          content: 'Que vous soyez professionnel de la beauté ou client à la recherche du salon parfait, SEFAIZO est là pour vous.',
          ctaText: 'Découvrir nos offres',
          ctaLink: '/auth/register'
        }
      ]
    };
  }

  private generateCareersPage(): PageContent {
    return {
      id: 'careers',
      slug: 'careers',
      title: 'Carrières chez SEFAIZO',
      subtitle: 'Rejoignez une aventure humaine et technologique unique',
      metaDescription: 'Consultez nos offres d\'emploi et rejoignez l\'équipe SEFAIZO pour construire la beauté de demain.',
      isPublished: true,
      lastModified: new Date(),
      sections: [
        {
          id: 's1',
          type: 'hero',
          title: 'Construisons ensemble la beauté de demain',
          content: 'Chez SEFAIZO, nous cherchons des talents passionnés qui veulent transformer l\'expérience beauté à Abidjan. Rejoignez une équipe dynamique, bienveillante et ambitieuse.'
        },
        {
          id: 's2',
          type: 'stats',
          title: 'Pourquoi nous rejoindre',
          stats: [
            { id: 'st1', value: '25+', label: 'Collaborateurs passionnés' },
            { id: 'st2', value: '100%', label: 'Télétravail flexible' },
            { id: 'st3', value: '∞', label: 'Opportunités de croissance' },
            { id: 'st4', value: '4.9/5', label: 'Satisfaction collaborateurs' }
          ]
        },
        {
          id: 's3',
          type: 'cards',
          title: 'Postes ouverts',
          cards: [
            { id: 'c1', title: 'Développeur Fullstack Senior', description: 'TypeScript, Angular, Node.js. Vous construirez les fonctionnalités de demain.', link: '/careers/apply' },
            { id: 'c2', title: 'Responsable Partenariats', description: 'Développez notre réseau de professionnels de la beauté à travers Abidjan.', link: '/careers/apply' },
            { id: 'c3', title: 'Community Manager', description: 'Animez nos réseaux sociaux et créez du lien avec notre communauté grandissante.', link: '/careers/apply' },
            { id: 'c4', title: 'Support Client', description: 'Accompagnez nos utilisateurs et garantissez une expérience client exceptionnelle.', link: '/careers/apply' }
          ]
        },
        {
          id: 's4',
          type: 'text',
          title: 'Notre culture',
          content: 'Nous croyons en une culture d\'entreprise basée sur la confiance, l\'autonomie et l\'impact. Chaque membre de l\'équipe a voix au chapitre et participe activement à la croissance de SEFAIZO. Nous offrons des avantages attractifs : assurance maladie, formations continues, team-buildings réguliers et une politique de télétravail flexible.'
        },
        {
          id: 's5',
          type: 'cta',
          title: 'Prêt(e) à nous rejoindre ?',
          content: 'Envoyez-nous votre candidature spontanée ou postulez à l\'une de nos offres ouvertes.',
          ctaText: 'Envoyer ma candidature',
          ctaLink: '/careers/apply'
        }
      ]
    };
  }

  private generatePressPage(): PageContent {
    return {
      id: 'press',
      slug: 'press',
      title: 'Presse & Médias',
      subtitle: 'SEFAIZO dans les médias',
      metaDescription: 'Retrouvez les articles de presse et communiqués sur SEFAIZO.',
      isPublished: true,
      lastModified: new Date(),
      sections: [
        {
          id: 's1',
          type: 'hero',
          title: 'SEFAIZO fait parler de lui',
          content: 'Depuis notre lancement, les médias ivoiriens et africains suivent notre aventure avec intérêt. Découvrez les articles et reportages qui nous ont été consacrés.'
        },
        {
          id: 's2',
          type: 'cards',
          title: 'Ils parlent de nous',
          cards: [
            { id: 'c1', title: 'Fraternité Matin - Mars 2026', description: '"SEFAIZO révolutionne la réservation beauté à Abidjan" - Article sur notre lancement officiel et nos ambitions pour le marché ivoirien.', icon: 'newspaper' },
            { id: 'c2', title: 'Jeune Afrique - Février 2026', description: '"Les startups africaines à suivre en 2026" - SEFAIZO cité parmi les 10 startups les plus prometteuses du continent.', icon: 'globe' },
            { id: 'c3', title: 'RTI Info - Janvier 2026', description: 'Reportage télévisé sur notre modèle innovant de marketplace beauté et notre impact sur l\'économie locale.', icon: 'tv' },
            { id: 'c4', title: 'TechCafé - Décembre 2025', description: 'Interview de notre fondateur sur la tech au service de la beauté et nos projets d\'expansion régionale.', icon: 'mic' }
          ]
        },
        {
          id: 's3',
          type: 'text',
          title: 'Kit Presse',
          content: 'Vous êtes journaliste ? Contactez notre service presse pour obtenir notre kit média : logo haute résolution, photos de l\'équipe, fiches produits et interviews exclusives.'
        },
        {
          id: 's4',
          type: 'cta',
          title: 'Contact Presse',
          content: 'Pour toute demande d\'information ou interview, contactez notre responsable communication.',
          ctaText: 'presse@sefaizo.ci',
          ctaLink: '/contact'
        }
      ]
    };
  }

  private generateBlogPage(): PageContent {
    return {
      id: 'blog',
      slug: 'blog',
      title: 'Blog SEFAIZO',
      subtitle: 'Conseils beauté, actualités et inspirations',
      metaDescription: 'Lisez nos articles sur la beauté, les tendances et les conseils de nos professionnels.',
      isPublished: true,
      lastModified: new Date(),
      sections: [
        {
          id: 's1',
          type: 'hero',
          title: 'Le Mag SEFAIZO',
          content: 'Découvrez nos conseils beauté, interviews de professionnels, tendances du moment et bien plus encore. Un espace dédié à l\'univers de la beauté en Afrique.'
        },
        {
          id: 's2',
          type: 'cards',
          title: 'Articles récents',
          cards: [
            { id: 'c1', title: '5 tendances coiffure pour 2026', description: 'Découvrez les coupes et styles qui feront sensation cette année selon nos professionnels partenaires.', icon: 'scissors' },
            { id: 'c2', title: 'Comment entretenir sa peau en saison sèche', description: 'Nos conseils d\'experts pour garder une peau hydratée et éclatante malgré la chaleur.', icon: 'sun' },
            { id: 'c3', title: 'Interview : Aïcha, coiffeuse depuis 15 ans', description: 'Elle nous raconte son parcours et comment SEFAIZO a transformé son activité.', icon: 'user' },
            { id: 'c4', title: 'Les bienfaits du massage relaxant', description: 'Pourquoi vous devriez intégrer le massage dans votre routine bien-être mensuelle.', icon: 'spa' },
            { id: 'c5', title: 'Guide : choisir son vernis selon sa carnation', description: 'Nos astuces pour trouver la couleur parfaite qui mettra en valeur vos mains.', icon: 'palette' },
            { id: 'c6', title: 'Barber : l\'art du dégradé parfait', description: 'Les techniques utilisées par nos meilleurs barbiers d\'Abidjan pour un résultat impeccable.', icon: 'user-circle' }
          ]
        },
        {
          id: 's3',
          type: 'cta',
          title: 'Devenir contributeur',
          content: 'Vous êtes professionnel de la beauté ? Partagez vos conseils et expertise avec notre communauté.',
          ctaText: 'Nous contacter',
          ctaLink: '/contact'
        }
      ]
    };
  }

  private generateBecomePartnerPage(): PageContent {
    return {
      id: 'become-partner',
      slug: 'become-partner',
      title: 'Devenir Partenaire SEFAIZO',
      subtitle: 'Développez votre activité beauté avec nous',
      metaDescription: 'Rejoignez SEFAIZO en tant que professionnel de la beauté et bénéficiez d\'une visibilité accrue.',
      isPublished: true,
      lastModified: new Date(),
      sections: [
        {
          id: 's1',
          type: 'hero',
          title: 'Rejoignez le réseau SEFAIZO',
          content: 'Plus de 500 professionnels nous font déjà confiance. En nous rejoignant, vous accédez à une clientèle qualifiée, un outil de gestion d\'agenda performant et un système de paiement sécurisé.'
        },
        {
          id: 's2',
          type: 'stats',
          title: 'Les avantages en chiffres',
          stats: [
            { id: 'st1', value: '+40%', label: 'De clients en moyenne' },
            { id: 'st2', value: '95%', label: 'De satisfaction pro' },
            { id: 'st3', value: '24h', label: 'Mise en ligne du profil' },
            { id: 'st4', value: '0', label: 'Frais d\'inscription' }
          ]
        },
        {
          id: 's3',
          type: 'cards',
          title: 'Ce que nous offrons',
          cards: [
            { id: 'c1', title: 'Visibilité maximale', description: 'Votre profil référencé sur SEFAIZO avec photos, avis et prestations détaillées.', icon: 'eye' },
            { id: 'c2', title: 'Gestion d\'agenda', description: 'Un outil intuitif pour gérer vos rendez-vous, disponibilités et annulations.', icon: 'calendar' },
            { id: 'c3', title: 'Paiements sécurisés', description: 'Mobile Money et cash. Recevez vos gains directement sur votre compte.', icon: 'credit-card' },
            { id: 'c4', title: 'Support dédié', description: 'Une équipe disponible pour vous accompagner et répondre à vos questions.', icon: 'headset' }
          ]
        },
        {
          id: 's4',
          type: 'text',
          title: 'Comment ça marche ?',
          content: '1. Inscrivez-vous en ligne en 5 minutes\n2. Vérifiez votre identité (KYC)\n3. Configurez votre profil et vos prestations\n4. Commencez à recevoir des réservations'
        },
        {
          id: 's5',
          type: 'cta',
          title: 'Prêt(e) à nous rejoindre ?',
          content: 'Créez votre compte professionnel gratuitement et commencez à recevoir vos premiers clients dès aujourd\'hui.',
          ctaText: 'Créer mon compte pro',
          ctaLink: '/auth/register/pro'
        }
      ]
    };
  }

  private generateResourcesPage(): PageContent {
    return {
      id: 'resources',
      slug: 'resources',
      title: 'Ressources Professionnels',
      subtitle: 'Guides, tutoriels et outils pour réussir',
      metaDescription: 'Accédez à nos ressources gratuites pour optimiser votre activité sur SEFAIZO.',
      isPublished: true,
      lastModified: new Date(),
      sections: [
        {
          id: 's1',
          type: 'hero',
          title: 'Le centre de ressources SEFAIZO',
          content: 'Nous mettons à disposition de nos professionnels partenaires des guides, tutoriels et outils pour maximiser leur activité sur la plateforme.'
        },
        {
          id: 's2',
          type: 'cards',
          title: 'Guides disponibles',
          cards: [
            { id: 'c1', title: 'Guide du profil parfait', description: 'Comment optimiser votre profil SEFAIZO pour attirer un maximum de clients.', icon: 'star' },
            { id: 'c2', title: 'Tarification intelligente', description: 'Fixez les prix de vos prestations pour maximiser vos revenus tout en restant compétitif.', icon: 'tag' },
            { id: 'c3', title: 'Gestion d\'agenda', description: 'Tutoriel complet sur l\'utilisation de notre outil de planification.', icon: 'calendar' },
            { id: 'c4', title: 'Marketing pour les pros', description: 'Astuces pour promouvoir votre activité en ligne et sur les réseaux sociaux.', icon: 'megaphone' }
          ]
        },
        {
          id: 's3',
          type: 'faq',
          title: 'Questions fréquentes',
          faqItems: [
            { id: 'f1', question: 'Combien coûte l\'inscription ?', answer: 'L\'inscription est 100% gratuite. Nous prélevons uniquement une commission de 15% sur les nouveaux clients que nous vous apportons.' },
            { id: 'f2', question: 'Comment sont versés les gains ?', answer: 'Les gains sont reversés chaque semaine sur votre compte Mobile Money ou bancaire selon votre préférence.' },
            { id: 'f3', question: 'Puis-je annuler une réservation ?', answer: 'Oui, mais nous recommandons de le faire au moins 24h à l\'avance pour préserver l\'expérience client.' }
          ]
        },
        {
          id: 's4',
          type: 'cta',
          title: 'Besoin d\'aide ?',
          content: 'Notre équipe support est disponible pour répondre à toutes vos questions.',
          ctaText: 'Contacter le support',
          ctaLink: '/contact'
        }
      ]
    };
  }

  private generatePricingPage(): PageContent {
    return {
      id: 'pricing',
      slug: 'pricing',
      title: 'Tarifs SEFAIZO',
      subtitle: 'Des offres adaptées à votre activité',
      metaDescription: 'Découvrez nos formules et tarifs pour professionnels de la beauté.',
      isPublished: true,
      lastModified: new Date(),
      sections: [
        {
          id: 's1',
          type: 'hero',
          title: 'Simple, transparent, sans surprise',
          content: 'SEFAIZO est gratuit à l\'inscription. Vous ne payez que lorsque vous gagnez de nouveaux clients grâce à notre plateforme.'
        },
        {
          id: 's2',
          type: 'cards',
          title: 'Nos formules',
          cards: [
            { id: 'c1', title: 'Gratuit', description: '• Inscription gratuite\n• Commission de 15% sur nouveaux clients\n• Paiements sécurisés\n• Support par email', icon: 'gift' },
            { id: 'c2', title: 'Premium - 15 000 FCFA/mois', description: '• Tout le plan Gratuit +\n• Commission réduite à 10%\n• Mise en avant du profil\n• Statistiques avancées\n• Support prioritaire', icon: 'crown' },
            { id: 'c3', title: 'Publicité', description: '• Bannière homepage : 50 000 FCFA/mois\n• Listing vedette : 25 000 FCFA/mois\n• Sponsor catégorie : 35 000 FCFA/mois', icon: 'megaphone' }
          ]
        },
        {
          id: 's3',
          type: 'text',
          title: 'Exemple concret',
          content: 'Si un nouveau client vous réserve une prestation à 10 000 FCFA via SEFAIZO (plan gratuit), la commission est de 1 500 FCFA. Vous recevez 8 500 FCFA. Avec le plan Premium, la commission n\'est que de 1 000 FCFA, vous recevez donc 9 000 FCFA.'
        },
        {
          id: 's4',
          type: 'cta',
          title: 'Commencez gratuitement',
          content: 'Aucun engagement, aucun frais caché. Rejoignez-nous et testez par vous-même.',
          ctaText: 'S\'inscrire gratuitement',
          ctaLink: '/auth/register/pro'
        }
      ]
    };
  }

  private generateSuccessStoriesPage(): PageContent {
    return {
      id: 'success-stories',
      slug: 'success-stories',
      title: 'Success Stories',
      subtitle: 'Ils ont réussi avec SEFAIZO',
      metaDescription: 'Découvrez les témoignages de professionnels qui ont développé leur activité grâce à SEFAIZO.',
      isPublished: true,
      lastModified: new Date(),
      sections: [
        {
          id: 's1',
          type: 'hero',
          title: 'Des histoires qui inspirent',
          content: 'Chaque jour, des professionnels de la beauté à Abidjan transforment leur activité grâce à SEFAIZO. Voici leurs témoignages.'
        },
        {
          id: 's2',
          type: 'cards',
          title: 'Témoignages',
          cards: [
            { id: 'c1', title: 'Aminata - Coiffeuse à Cocody', description: '"Avant SEFAIZO, j\'avais 10-15 clientes par semaine. Aujourd\'hui, j\'en accueille plus de 30. La plateforme a vraiment boosté mon activité." - +150% de CA en 6 mois', icon: 'user' },
            { id: 'c2', title: 'Barber Shop Plateau', description: '"Grâce à la visibilité SEFAIZO, nous avons doublé notre chiffre d\'affaires. L\'outil de gestion d\'agenda nous fait gagner un temps précieux." - 200 réservations/mois', icon: 'scissors' },
            { id: 'c3', title: 'Nails & Spa Yopougon', description: '"Le plan Premium vaut chaque franc investi. Avec la commission réduite et la mise en avant, on a rapidement rentabilisé notre abonnement."', icon: 'star' },
            { id: 'c4', title: 'Marie - Maquilleuse freelance', description: '"En tant que freelance, SEFAIZO m\'a permis de trouver des clientes que je n\'aurais jamais eues autrement. Je recommande à 100%."', icon: 'heart' }
          ]
        },
        {
          id: 's3',
          type: 'stats',
          title: 'Résultats moyens de nos partenaires',
          stats: [
            { id: 'st1', value: '+80%', label: 'De clients supplémentaires' },
            { id: 'st2', value: '+45%', label: 'De chiffre d\'affaires' },
            { id: 'st3', value: '92%', label: 'De partenaires satisfaits' },
            { id: 'st4', value: '30 min', label: 'Économisées par jour' }
          ]
        },
        {
          id: 's4',
          type: 'cta',
          title: 'Votre success story commence ici',
          content: 'Rejoignez nos partenaires et écrivez votre propre histoire de réussite.',
          ctaText: 'Rejoindre SEFAIZO',
          ctaLink: '/auth/register/pro'
        }
      ]
    };
  }

  private generateHelpCenterPage(): PageContent {
    return {
      id: 'help-center',
      slug: 'help-center',
      title: 'Centre d\'aide',
      subtitle: 'Comment pouvons-nous vous aider ?',
      metaDescription: 'Trouvez des réponses à vos questions sur SEFAIZO.',
      isPublished: true,
      lastModified: new Date(),
      sections: [
        {
          id: 's1',
          type: 'hero',
          title: 'Bienvenue au Centre d\'aide',
          content: 'Consultez nos guides et FAQ pour trouver rapidement des réponses à vos questions.'
        },
        {
          id: 's2',
          type: 'cards',
          title: 'Catégories d\'aide',
          cards: [
            { id: 'c1', title: 'Premiers pas', description: 'Créer un compte, compléter son profil, effectuer sa première réservation.', icon: 'flag' },
            { id: 'c2', title: 'Réservations', description: 'Réserver, modifier ou annuler un rendez-vous.', icon: 'calendar' },
            { id: 'c3', title: 'Paiements', description: 'Modes de paiement, remboursements et factures.', icon: 'credit-card' },
            { id: 'c4', title: 'Pour les pros', description: 'Gérer son agenda, ses prestations, ses gains.', icon: 'briefcase' }
          ]
        },
        {
          id: 's3',
          type: 'faq',
          title: 'Questions fréquentes',
          faqItems: [
            { id: 'f1', question: 'Comment créer un compte ?', answer: 'Cliquez sur "S\'inscrire" en haut de la page, remplissez le formulaire avec vos informations et validez. C\'est gratuit et cela prend moins de 2 minutes.' },
            { id: 'f2', question: 'Comment annuler une réservation ?', answer: 'Rendez-vous dans "Mes réservations", sélectionnez le rendez-vous concerné et cliquez sur "Annuler". Attention, des frais peuvent s\'appliquer si l\'annulation est tardive.' },
            { id: 'f3', question: 'Quels modes de paiement sont acceptés ?', answer: 'Nous acceptons le paiement par Mobile Money (Orange Money, MTN, Moov) et en espèces directement au salon.' },
            { id: 'f4', question: 'Comment contacter mon professionnel ?', answer: 'Après votre réservation, vous trouverez les coordonnées de votre professionnel dans la confirmation par email et dans votre espace client.' }
          ]
        },
        {
          id: 's4',
          type: 'cta',
          title: 'Vous n\'avez pas trouvé votre réponse ?',
          content: 'Notre équipe est là pour vous aider.',
          ctaText: 'Nous contacter',
          ctaLink: '/contact'
        }
      ]
    };
  }

  private generateContactPage(): PageContent {
    return {
      id: 'contact',
      slug: 'contact',
      title: 'Contactez-nous',
      subtitle: 'Nous sommes à votre écoute',
      metaDescription: 'Contactez l\'équipe SEFAIZO pour toute question ou demande d\'information.',
      isPublished: true,
      lastModified: new Date(),
      sections: [
        {
          id: 's1',
          type: 'hero',
          title: 'Parlons de votre projet',
          content: 'Une question, une suggestion ou un problème ? Notre équipe vous répond sous 24h.'
        },
        {
          id: 's2',
          type: 'cards',
          title: 'Nos coordonnées',
          cards: [
            { id: 'c1', title: 'Email', description: 'support@sefaizo.ci\nRéponse sous 24h', icon: 'mail' },
            { id: 'c2', title: 'Téléphone', description: '+225 07 00 00 00 00\nLun - Ven, 8h - 18h', icon: 'phone' },
            { id: 'c3', title: 'Adresse', description: 'Cocody, Abidjan\nCôte d\'Ivoire', icon: 'map-pin' },
            { id: 'c4', title: 'WhatsApp', description: '+225 05 00 00 00 00\nDisponible 7j/7', icon: 'message-circle' }
          ]
        },
        {
          id: 's3',
          type: 'text',
          title: 'Formulaire de contact',
          content: 'Pour nous contacter directement, utilisez le formulaire disponible sur notre page de contact ou envoyez-nous un email à support@sefaizo.ci'
        }
      ]
    };
  }

  private generateFaqPage(): PageContent {
    return {
      id: 'faq',
      slug: 'faq',
      title: 'FAQ - Foire Aux Questions',
      subtitle: 'Tout ce que vous devez savoir',
      metaDescription: 'Retrouvez les réponses aux questions les plus fréquemment posées sur SEFAIZO.',
      isPublished: true,
      lastModified: new Date(),
      sections: [
        {
          id: 's1',
          type: 'hero',
          title: 'Questions fréquentes',
          content: 'Les réponses aux questions les plus courantes sur SEFAIZO.'
        },
        {
          id: 's2',
          type: 'faq',
          title: 'Général',
          faqItems: [
            { id: 'f1', question: 'Qu\'est-ce que SEFAIZO ?', answer: 'SEFAIZO est une marketplace qui connecte les clients aux meilleurs professionnels de la beauté à Abidjan. Vous pouvez réserver coiffure, esthétique, manucure et bien plus en quelques clics.' },
            { id: 'f2', question: 'SEFAIZO est-il gratuit pour les clients ?', answer: 'Oui, l\'inscription et l\'utilisation de SEFAIZO sont 100% gratuites pour les clients. Vous payez uniquement la prestation réservée.' },
            { id: 'f3', question: 'Dans quelles communes SEFAIZO est-il disponible ?', answer: 'Nous couvrons actuellement 10 communes d\'Abidjan : Cocody, Plateau, Yopougon, Marcory, Treichville, Adjamé, Abobo, Port-Bouët, Attécoubé et Koumassi.' }
          ]
        },
        {
          id: 's3',
          type: 'faq',
          title: 'Pour les professionnels',
          faqItems: [
            { id: 'f4', question: 'Comment m\'inscrire en tant que professionnel ?', answer: 'Rendez-vous sur /auth/register/pro, choisissez votre type de compte (freelance ou salon), remplissez vos informations et activez votre profil.' },
            { id: 'f5', question: 'Quel est le coût pour les professionnels ?', answer: 'L\'inscription est gratuite. Nous prélevons une commission de 15% sur les nouveaux clients que nous vous apportons. Un plan Premium à 15 000 FCFA/mois réduit cette commission à 10%.' },
            { id: 'f6', question: 'Comment recevoir mes gains ?', answer: 'Vos gains sont reversés chaque semaine par Mobile Money ou virement bancaire selon votre préférence.' }
          ]
        },
        {
          id: 's4',
          type: 'faq',
          title: 'Réservations & Paiements',
          faqItems: [
            { id: 'f7', question: 'Comment annuler ma réservation ?', answer: 'Depuis votre espace client, accédez à "Mes réservations" et cliquez sur "Annuler". Si l\'annulation intervient moins de 24h avant le RDV, des frais de 3 000 FCFA peuvent s\'appliquer.' },
            { id: 'f8', question: 'Quels modes de paiement sont acceptés ?', answer: 'Nous acceptons Mobile Money (Orange, MTN, Moov) et le paiement en espèces au salon.' },
            { id: 'f9', question: 'Puis-je modifier mon rendez-vous ?', answer: 'Oui, depuis votre espace client vous pouvez modifier la date et l\'heure de votre RDV dans la limite des disponibilités du professionnel.' }
          ]
        }
      ]
    };
  }

  private generateAccessibilityPage(): PageContent {
    return {
      id: 'accessibility',
      slug: 'accessibility',
      title: 'Accessibilité',
      subtitle: 'SEFAIZO pour tous',
      metaDescription: 'Notre engagement pour l\'accessibilité numérique.',
      isPublished: true,
      lastModified: new Date(),
      sections: [
        {
          id: 's1',
          type: 'hero',
          title: 'L\'accessibilité au cœur de notre démarche',
          content: 'Chez SEFAIZO, nous nous engageons à rendre notre plateforme accessible à tous, y compris aux personnes en situation de handicap. Nous travaillons continuellement à améliorer l\'expérience utilisateur pour chacun.'
        },
        {
          id: 's2',
          type: 'cards',
          title: 'Nos engagements',
          cards: [
            { id: 'c1', title: 'Contraste des couleurs', description: 'Nous utilisons des contrastes suffisants pour une lecture optimale par tous les utilisateurs.', icon: 'contrast' },
            { id: 'c2', title: 'Navigation au clavier', description: 'Notre plateforme est entièrement navigable au clavier pour les personnes ne pouvant pas utiliser une souris.', icon: 'keyboard' },
            { id: 'c3', title: 'Compatibilité lecteurs d\'écran', description: 'Nos pages sont structurées pour être compatibles avec les principaux lecteurs d\'écran.', icon: 'volume' },
            { id: 'c4', title: 'Texte alternatif', description: 'Toutes nos images importantes disposent d\'un texte alternatif descriptif.', icon: 'image' }
          ]
        },
        {
          id: 's3',
          type: 'text',
          title: 'Signaler un problème',
          content: 'Si vous rencontrez des difficultés pour accéder à un contenu ou utiliser une fonctionnalité de SEFAIZO, n\'hésitez pas à nous contacter à accessibilite@sefaizo.ci. Nous nous engageons à répondre sous 48h.'
        }
      ]
    };
  }

  private generatePrivacyPage(): PageContent {
    return {
      id: 'privacy',
      slug: 'privacy',
      title: 'Politique de confidentialité',
      subtitle: 'Votre vie privée est notre priorité',
      metaDescription: 'Consultez notre politique de confidentialité pour savoir comment nous protégeons vos données.',
      isPublished: true,
      lastModified: new Date(),
      sections: [
        {
          id: 's1',
          type: 'hero',
          title: 'Protection de vos données personnelles',
          content: 'Dernière mise à jour : Avril 2026. SEFAIZO s\'engage à protéger la confidentialité de vos données personnelles conformément à la loi ivoirienne et aux normes internationales.'
        },
        {
          id: 's2',
          type: 'text',
          title: 'Données collectées',
          content: 'Nous collectons les données suivantes : nom, prénom, email, téléphone, données de navigation, historique de réservations. Ces données sont nécessaires au bon fonctionnement de nos services.'
        },
        {
          id: 's3',
          type: 'text',
          title: 'Utilisation des données',
          content: 'Vos données sont utilisées pour : créer et gérer votre compte, traiter vos réservations, vous envoyer des notifications, améliorer nos services, prévenir la fraude.'
        },
        {
          id: 's4',
          type: 'text',
          title: 'Vos droits',
          content: 'Conformément à la loi, vous disposez d\'un droit d\'accès, de rectification et de suppression de vos données. Contactez-nous à : dpo@sefaizo.ci'
        },
        {
          id: 's5',
          type: 'text',
          title: 'Sécurité',
          content: 'Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger vos données contre tout accès non autorisé, modification, divulgation ou destruction.'
        }
      ]
    };
  }

  private generateTermsPage(): PageContent {
    return {
      id: 'terms',
      slug: 'terms',
      title: 'Conditions d\'utilisation',
      subtitle: 'Règles d\'utilisation de la plateforme',
      metaDescription: 'Consultez nos conditions générales d\'utilisation.',
      isPublished: true,
      lastModified: new Date(),
      sections: [
        {
          id: 's1',
          type: 'hero',
          title: 'Conditions Générales d\'Utilisation',
          content: 'Dernière mise à jour : Avril 2026. En utilisant SEFAIZO, vous acceptez les présentes conditions générales d\'utilisation.'
        },
        {
          id: 's2',
          type: 'text',
          title: '1. Objet',
          content: 'SEFAIZO est une marketplace mettant en relation des clients avec des professionnels de la beauté à Abidjan.'
        },
        {
          id: 's3',
          type: 'text',
          title: '2. Inscription',
          content: 'L\'inscription nécessite d\'être majeur et de fournir des informations exactes. Chaque utilisateur est responsable de la confidentialité de son mot de passe.'
        },
        {
          id: 's4',
          type: 'text',
          title: '3. Réservations',
          content: 'Toute réservation est ferme et définitive. L\'annulation est possible selon les conditions décrites dans notre FAQ. Les no-shows répétés peuvent entraîner la suspension du compte.'
        },
        {
          id: 's5',
          type: 'text',
          title: '4. Responsabilité',
          content: 'SEFAIZO agit en tant qu\'intermédiaire technique et ne saurait être tenu responsable de la qualité des prestations fournies par les professionnels.'
        },
        {
          id: 's6',
          type: 'text',
          title: '5. Propriété intellectuelle',
          content: 'L\'ensemble du contenu de la plateforme SEFAIZO est protégé par le droit d\'auteur. Toute reproduction est interdite sans autorisation.'
        }
      ]
    };
  }

  private generateCookiesPage(): PageContent {
    return {
      id: 'cookies',
      slug: 'cookies',
      title: 'Politique de cookies',
      subtitle: 'Comprendre l\'utilisation des cookies',
      metaDescription: 'Découvrez comment SEFAIZO utilise les cookies.',
      isPublished: true,
      lastModified: new Date(),
      sections: [
        {
          id: 's1',
          type: 'hero',
          title: 'Notre utilisation des cookies',
          content: 'SEFAIZO utilise des cookies pour améliorer votre expérience sur notre plateforme.'
        },
        {
          id: 's2',
          type: 'cards',
          title: 'Types de cookies utilisés',
          cards: [
            { id: 'c1', title: 'Cookies essentiels', description: 'Nécessaires au fonctionnement de la plateforme (authentification, sécurité).', icon: 'shield' },
            { id: 'c2', title: 'Cookies de performance', description: 'Nous aident à comprendre comment les visiteurs utilisent notre site.', icon: 'bar-chart' },
            { id: 'c3', title: 'Cookies de personnalisation', description: 'Mémorisent vos préférences pour une expérience plus fluide.', icon: 'settings' }
          ]
        },
        {
          id: 's3',
          type: 'text',
          title: 'Gérer vos préférences',
          content: 'Vous pouvez configurer votre navigateur pour refuser les cookies. Notez que cela pourrait affecter certaines fonctionnalités de la plateforme.'
        }
      ]
    };
  }

  private generateLegalPage(): PageContent {
    return {
      id: 'legal',
      slug: 'legal',
      title: 'Mentions légales',
      subtitle: 'Informations légales',
      metaDescription: 'Mentions légales de la plateforme SEFAIZO.',
      isPublished: true,
      lastModified: new Date(),
      sections: [
        {
          id: 's1',
          type: 'hero',
          title: 'Mentions légales',
          content: 'Conformément aux dispositions légales en vigueur en Côte d\'Ivoire.'
        },
        {
          id: 's2',
          type: 'text',
          title: 'Éditeur du site',
          content: 'SEFAIZO SARL\nSiège social : Cocody, Abidjan, Côte d\'Ivoire\nRegistre de commerce : CI-ABJ-2025-B-XXXXX\nCapital social : 10 000 000 FCFA'
        },
        {
          id: 's3',
          type: 'text',
          title: 'Directeur de la publication',
          content: 'Le directeur de la publication est le Président de SEFAIZO SARL.'
        },
        {
          id: 's4',
          type: 'text',
          title: 'Hébergement',
          content: 'Le site est hébergé par des serveurs sécurisés conformes aux standards internationaux.'
        },
        {
          id: 's5',
          type: 'text',
          title: 'Propriété intellectuelle',
          content: 'L\'ensemble des éléments graphiques, textuels et techniques du site SEFAIZO sont la propriété exclusive de SEFAIZO SARL.'
        }
      ]
    };
  }
}
