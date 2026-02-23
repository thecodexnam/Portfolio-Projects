import ServiceCard from '@/components/ServiceCard';
import Link from 'next/link';

export default function ServicesPage() {
    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#050505] via-[#0a0a0a] to-[#050505] z-0">
                    <div className="absolute top-1/4 -right-20 w-80 h-80 bg-ocean-blue/10 rounded-full blur-[120px] animate-pulse"></div>
                    <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-ocean-teal/10 rounded-full blur-[120px] animate-pulse"></div>
                </div>
                <div className="relative z-10 container-wide text-center">
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tight">
                        Online Coaching <span className="gradient-text glow-text">Services</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto font-medium leading-relaxed">
                        Fully customized programs based on your goals, body type, and lifestyle. <br className="hidden md:block" /> Choose the package that fits your transformation journey.
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="section-padding">
                <div className="container-wide">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-16">
                        <ServiceCard
                            icon="💪"
                            title="1:1 Online Coaching"
                            description="Personalized monthly coaching with custom workouts, diet plans, and weekly check-ins to keep you on track."
                            features={[
                                'Custom workout program',
                                'Personalized meal plans',
                                'Weekly progress check-ins',
                                'WhatsApp support',
                                'Form correction videos',
                                'Monthly program adjustments'
                            ]}
                            price="₹4,999/month"
                            href="/contact"
                        />
                        <ServiceCard
                            icon="🔥"
                            title="Transformation Program"
                            description="8-16 week intensive program designed for serious fat loss or muscle gain with guaranteed results."
                            features={[
                                'Complete transformation plan',
                                'Bi-weekly adjustments',
                                'Supplement guidance',
                                'Before/after documentation',
                                'Lifetime support group access',
                                'Nutrition education'
                            ]}
                            price="₹12,999"
                            href="/contact"
                        />
                        <ServiceCard
                            icon="🏆"
                            title="Stage Prep Coaching"
                            description="Competition preparation for aspiring bodybuilders and physique athletes. Peak week protocol included."
                            features={[
                                'Contest prep strategy',
                                'Posing coaching',
                                'Peak week protocol',
                                'Stage presence training',
                                'Post-show recovery plan',
                                'Competition day support'
                            ]}
                            price="₹19,999"
                            href="/contact"
                        />
                    </div>
                </div>
            </section>

            {/* What's Included */}
            <section className="section-padding bg-[#0a0a0a]">
                <div className="container-wide">
                    <h2 className="text-4xl md:text-5xl font-black text-white text-center mb-16 uppercase tracking-tight">
                        What&apos;s <span className="gradient-text">Included</span>
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {[
                            { icon: '📋', title: 'Custom Workout Plans', desc: 'Tailored to your goals, experience level, and available equipment' },
                            { icon: '🍽️', title: 'Personalized Nutrition', desc: 'Meal plans that fit your lifestyle, preferences, and dietary needs' },
                            { icon: '📊', title: 'Progress Tracking', desc: 'Regular check-ins with photos, measurements, and performance data' },
                            { icon: '💬', title: '24/7 WhatsApp Support', desc: 'Direct access to your coach for questions and guidance' },
                            { icon: '🎥', title: 'Form Check Videos', desc: 'Video analysis to ensure proper technique and prevent injuries' },
                            { icon: '📈', title: 'Program Adjustments', desc: 'Regular updates based on your progress and feedback' },
                            { icon: '💊', title: 'Supplement Guidance', desc: 'Evidence-based recommendations for your specific goals' },
                            { icon: '🧠', title: 'Mindset Coaching', desc: 'Mental strategies to stay motivated and overcome plateaus' },
                        ].map((item, index) => (
                            <div key={index} className="glass rounded-2xl p-8 text-center hover:border-ocean-blue/50 transition-all hover:-translate-y-2 group">
                                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                                <h3 className="text-lg font-black text-white mb-3 uppercase tracking-tight group-hover:gradient-text transition-colors">{item.title}</h3>
                                <p className="text-gray-400 text-sm font-medium leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="section-padding">
                <div className="container-tight">
                    <h2 className="text-4xl md:text-5xl font-black text-white text-center mb-16 uppercase tracking-tight">
                        Frequently Asked <br /> <span className="gradient-text">QUESTIONS</span>
                    </h2>

                    <div className="space-y-6">
                        {[
                            {
                                q: 'How does online coaching work?',
                                a: 'After signing up, you\'ll receive a detailed questionnaire. Based on your responses, I\'ll create a custom workout and nutrition plan. We\'ll have weekly check-ins via WhatsApp where you send progress photos and updates. I\'ll adjust your program as needed to ensure continuous progress.'
                            },
                            {
                                q: 'Do I need a gym membership?',
                                a: 'Not necessarily! I can design programs for home workouts, gym training, or a combination of both. Just let me know what equipment you have access to.'
                            },
                            {
                                q: 'How quickly will I see results?',
                                a: 'Most clients see noticeable changes within 4-6 weeks. However, sustainable transformation takes time. The 12-16 week programs typically deliver the most dramatic results.'
                            },
                            {
                                q: 'What if I have dietary restrictions?',
                                a: 'All meal plans are fully customized to your preferences, allergies, and dietary restrictions. Whether you\'re vegetarian, vegan, or have specific food intolerances, I\'ll create a plan that works for you.'
                            },
                            {
                                q: 'Can beginners join?',
                                a: 'Absolutely! I work with clients at all fitness levels, from complete beginners to advanced athletes. Your program will be tailored to your current experience and abilities.'
                            },
                        ].map((faq, index) => (
                            <div key={index} className="glass rounded-2xl p-8 border border-white/5 hover:border-ocean-blue/30 transition-all group">
                                <h3 className="text-xl font-black gradient-text mb-4 uppercase tracking-tight group-hover:glow-text transition-all">{faq.q}</h3>
                                <p className="text-gray-300 text-lg leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding bg-[#0a0a0a]">
                <div className="container-tight text-center">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-8 uppercase tracking-tight">
                        Ready to Get <span className="gradient-text">Started?</span>
                    </h2>
                    <p className="text-gray-300 text-xl mb-10 font-medium leading-relaxed">
                        Apply now and take the first step toward your transformation.
                    </p>
                    <Link
                        href="/contact"
                        className="bg-gradient-to-r from-ocean-blue via-ocean-teal to-ocean-indigo text-white px-12 py-5 rounded-xl font-bold text-xl hover:shadow-2xl hover:shadow-ocean-blue/40 transition-all hover:-translate-y-1 active:scale-95 uppercase tracking-widest inline-block"
                    >
                        Apply for Coaching
                    </Link>
                </div>
            </section>
        </div>
    );
}
