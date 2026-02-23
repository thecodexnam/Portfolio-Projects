import Link from 'next/link';

export default function GymPage() {
    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#050505] via-[#0a0a0a] to-[#050505] z-0">
                    <div className="absolute top-1/4 -right-20 w-80 h-80 bg-ocean-blue/10 rounded-full blur-[120px] animate-pulse"></div>
                    <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-ocean-teal/10 rounded-full blur-[120px] animate-pulse"></div>
                </div>
                <div className="relative z-10 container-wide text-center">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 uppercase tracking-tight leading-tight">
                        <span className="gradient-text glow-text">MUSCLE OCEAN</span> <br className="md:hidden" /> GYM
                    </h1>
                    <p className="text-2xl text-ocean-blue font-black tracking-widest uppercase">
                        Where Champions Are Built
                    </p>
                </div>
            </section>

            {/* Overview Section */}
            <section className="section-padding">
                <div className="container-wide">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        {/* Image Container with Glow */}
                        <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden group order-first lg:order-first">
                            <div className="absolute -inset-[2px] bg-gradient-to-br from-ocean-blue to-ocean-teal rounded-2xl opacity-20 blur-sm z-0"></div>
                            <div className="relative z-10 w-full h-full bg-[#1a1a1a] flex items-center justify-center text-gray-500 text-sm sm:text-base p-4 text-center border border-white/10 hover:border-white/20 transition-colors">
                                [Gym Interior Photo - Replace with actual image]
                            </div>
                        </div>

                        {/* Content */}
                        <div className="space-y-8 text-center lg:text-left">
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-[1.1]">
                                State-of-the-Art <br /> <span className="gradient-text">FACILITY</span>
                            </h2>
                            <div className="space-y-4 text-gray-300 text-lg sm:text-xl font-medium leading-relaxed">
                                <p>
                                    MuscleOcean Gym is more than just a fitness center—it&apos;s a community of dedicated athletes, bodybuilders, and fitness enthusiasts pushing their limits every day.
                                </p>
                                <p>
                                    Equipped with premium equipment, expert trainers, and a motivating atmosphere, we provide everything you need to achieve your fitness goals.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Facilities Section */}
            <section className="section-padding bg-[#0a0a0a] relative overflow-hidden">
                <div className="absolute top-1/2 -right-40 w-96 h-96 bg-ocean-blue/5 rounded-full blur-[120px] animate-pulse"></div>
                <div className="container-wide relative z-10">
                    <h2 className="text-4xl md:text-5xl font-black text-white text-center mb-16 uppercase tracking-tight leading-tight">
                        World-Class <span className="gradient-text">Facilities</span>
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {[
                            { icon: '🏋️', title: 'Free Weights Zone', desc: 'Complete range of dumbbells, barbells, and Olympic lifting platforms' },
                            { icon: '⚙️', title: 'Premium Machines', desc: 'Latest strength and resistance training equipment from top brands' },
                            { icon: '🏃', title: 'Cardio Area', desc: 'Treadmills, bikes, ellipticals, and rowing machines' },
                            { icon: '💪', title: 'Functional Training', desc: 'Battle ropes, kettlebells, TRX, and functional fitness equipment' },
                            { icon: '🎯', title: 'Posing Room', desc: 'Dedicated space with mirrors for posing practice and form checks' },
                            { icon: '🧘', title: 'Stretching Area', desc: 'Dedicated zone for warm-up, cool-down, and flexibility training' },
                        ].map((facility, index) => (
                            <div key={index} className="glass rounded-2xl p-8 text-center border border-white/5 hover:border-ocean-blue/30 transition-all group hover:-translate-y-2">
                                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">{facility.icon}</div>
                                <h3 className="text-xl font-black text-white mb-3 uppercase tracking-tight group-hover:gradient-text transition-colors">{facility.title}</h3>
                                <p className="text-gray-400 font-medium leading-relaxed">{facility.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Membership Section */}
            <section className="section-padding relative overflow-hidden">
                <div className="absolute top-0 -left-40 w-80 h-80 bg-ocean-teal/5 rounded-full blur-[120px] animate-pulse"></div>
                <div className="container-wide relative z-10">
                    <h2 className="text-4xl md:text-5xl font-black text-white text-center mb-16 uppercase tracking-tight">
                        Membership <span className="gradient-text">Options</span>
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { title: 'Monthly', price: '₹2,999', features: ['Full gym access', 'Locker facility', 'Basic training guidance'] },
                            { title: 'Quarterly', price: '₹7,999', features: ['Full gym access', 'Locker facility', 'Free diet consultation', '1 PT session included'], popular: true },
                            { title: 'Annual', price: '₹24,999', features: ['Full gym access', 'Locker facility', 'Monthly diet reviews', '4 PT sessions included', 'Priority booking'] },
                        ].map((plan, index) => (
                            <div key={index} className={`glass rounded-2xl p-8 relative border border-white/5 hover:border-ocean-blue/30 transition-all hover:-translate-y-2 group flex flex-col ${plan.popular ? 'border-ocean-blue/50 ring-1 ring-ocean-blue/30' : ''}`}>
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-ocean-blue to-ocean-teal text-white px-8 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-xl shadow-ocean-blue/40">
                                        Most Popular
                                    </div>
                                )}
                                <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter group-hover:gradient-text transition-colors">{plan.title}</h3>
                                <div className="text-5xl font-black gradient-text mb-8 tracking-tighter group-hover:glow-text transition-all">{plan.price}</div>
                                <ul className="space-y-4 mb-10 flex-grow">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start text-gray-300 font-medium group-hover:text-white transition-colors">
                                            <svg className="w-5 h-5 text-ocean-blue mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href="/contact"
                                    className={`block text-center px-8 py-5 rounded-2xl font-black transition-all hover:shadow-2xl uppercase tracking-widest active:scale-95 ${plan.popular ? 'bg-gradient-to-r from-ocean-blue to-ocean-teal text-white hover:shadow-ocean-blue/40' : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'}`}
                                >
                                    JOIN NOW
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Location & Hours */}
            <section className="section-padding bg-[#0f0f0f] relative overflow-hidden">
                <div className="absolute bottom-0 -right-40 w-80 h-80 bg-ocean-indigo/5 rounded-full blur-[120px] animate-pulse"></div>
                <div className="container-wide relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                        {/* Location */}
                        <div className="space-y-8">
                            <h2 className="text-4xl font-black text-white uppercase tracking-tight text-center lg:text-left">
                                <span className="gradient-text">Location</span>
                            </h2>
                            <div className="glass rounded-3xl p-8 sm:p-10 border border-white/5 hover:border-white/10 transition-all space-y-8">
                                <div className="space-y-3">
                                    <h3 className="text-lg font-black text-ocean-blue uppercase tracking-widest border-b border-white/5 pb-2">Address</h3>
                                    <p className="text-gray-300 text-lg leading-relaxed">
                                        123 Fitness Street, Sector 45<br />
                                        Mumbai, Maharashtra 400001<br />
                                        India
                                    </p>
                                </div>
                                <div className="space-y-3">
                                    <h3 className="text-lg font-black text-ocean-teal uppercase tracking-widest border-b border-white/5 pb-2">Contact</h3>
                                    <p className="text-gray-300 text-lg leading-relaxed">
                                        Phone: +91 98765 43210<br />
                                        Email: gym@muscleocean.com
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Hours */}
                        <div className="space-y-8">
                            <h2 className="text-4xl font-black text-white uppercase tracking-tight text-center lg:text-left">
                                Opening <span className="gradient-text">Hours</span>
                            </h2>
                            <div className="glass rounded-3xl p-8 sm:p-10 border border-white/5 hover:border-white/10 transition-all space-y-2">
                                {[
                                    { day: 'Monday - Friday', hours: '6:00 AM - 10:00 PM' },
                                    { day: 'Saturday', hours: '6:00 AM - 9:00 PM' },
                                    { day: 'Sunday', hours: '7:00 AM - 8:00 PM' },
                                ].map((schedule, index) => (
                                    <div key={index} className="flex justify-between items-center py-4 border-b border-white/5 last:border-0 hover:bg-white/5 px-4 rounded-xl transition-all group">
                                        <span className="text-gray-400 font-bold uppercase text-xs tracking-widest group-hover:text-ocean-blue transition-colors">{schedule.day}</span>
                                        <span className="gradient-text font-black text-lg group-hover:glow-text transition-all">{schedule.hours}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding bg-[#0a0a0a]">
                <div className="container-tight text-center">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-8 uppercase tracking-tight leading-tight">
                        Visit <br className="sm:hidden" /> <span className="gradient-text">MUSCLE OCEAN</span> <br className="sm:hidden" /> Today
                    </h2>
                    <p className="text-gray-300 text-xl mb-12 font-medium leading-relaxed">
                        Experience the difference. Book a free trial session now and join the elite.
                    </p>
                    <Link
                        href="/contact"
                        className="bg-gradient-to-r from-ocean-blue via-ocean-teal to-ocean-indigo text-white px-12 py-5 rounded-2xl font-black text-xl hover:shadow-2xl hover:shadow-ocean-blue/40 transition-all hover:-translate-y-1 active:scale-95 uppercase tracking-widest inline-block"
                    >
                        Book Free Trial
                    </Link>
                </div>
            </section>
        </div>
    );
}
