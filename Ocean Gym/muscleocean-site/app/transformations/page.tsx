import TransformationCard from '@/components/TransformationCard';
import Link from 'next/link';

export default function TransformationsPage() {
    const transformations = [
        { beforeImage: '/placeholder-before.jpg', afterImage: '/placeholder-after.jpg', name: 'Rahul S.', stats: 'Lost 12 kg in 16 weeks', testimonial: 'Best decision I ever made. The coach completely transformed my body and mindset.' },
        { beforeImage: '/placeholder-before.jpg', afterImage: '/placeholder-after.jpg', name: 'Amit K.', stats: 'Gained 8 kg muscle in 12 weeks', testimonial: 'Professional guidance that actually works. Highly recommend MuscleOcean coaching!' },
        { beforeImage: '/placeholder-before.jpg', afterImage: '/placeholder-after.jpg', name: 'Vikram M.', stats: 'Lost 15 kg in 20 weeks', testimonial: 'Changed my life completely. The support and expertise are unmatched.' },
        { beforeImage: '/placeholder-before.jpg', afterImage: '/placeholder-after.jpg', name: 'Priya S.', stats: 'Lost 10 kg in 14 weeks', testimonial: 'Finally found a coach who understands women\'s fitness. Amazing results!' },
        { beforeImage: '/placeholder-before.jpg', afterImage: '/placeholder-after.jpg', name: 'Rohan P.', stats: 'Gained 10 kg muscle in 16 weeks', testimonial: 'From skinny to muscular. The program is intense but worth every rep.' },
        { beforeImage: '/placeholder-before.jpg', afterImage: '/placeholder-after.jpg', name: 'Arjun T.', stats: 'Lost 18 kg in 24 weeks', testimonial: 'Went from overweight to stage-ready. MuscleOcean coaching is world-class.' },
    ];

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#050505] via-[#0a0a0a] to-[#050505] z-0">
                    <div className="absolute top-1/4 -right-20 w-80 h-80 bg-ocean-blue/10 rounded-full blur-[120px] animate-pulse"></div>
                    <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-ocean-teal/10 rounded-full blur-[120px] animate-pulse"></div>
                </div>
                <div className="relative z-10 container-wide text-center">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 uppercase tracking-tight">
                        Client <span className="gradient-text glow-text">Transformations</span>
                    </h1>
                    <p className="text-2xl text-ocean-blue font-black mb-4 uppercase tracking-widest">
                        Real People. Real Results.
                    </p>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed">
                        These transformations represent dedication, consistency, and expert coaching. <br className="hidden md:block" /> Welcome to the MuscleOcean family.
                    </p>
                </div>
            </section>

            {/* Transformations Grid */}
            <section className="section-padding">
                <div className="container-wide">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                        {transformations.map((transformation, index) => (
                            <TransformationCard key={index} {...transformation} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="section-padding bg-[#0a0a0a] relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-ocean-blue/5 rounded-full blur-[120px] animate-pulse"></div>
                <div className="container-wide relative z-10">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
                        {[
                            { number: '100+', label: 'Clients Transformed' },
                            { number: '500+', label: 'Kg Fat Lost' },
                            { number: '300+', label: 'Kg Muscle Gained' },
                            { number: '98%', label: 'Success Rate' },
                        ].map((stat, index) => (
                            <div key={index} className="glass rounded-2xl p-8 border border-white/5 hover:border-ocean-blue/30 transition-all group">
                                <div className="text-4xl sm:text-5xl font-black gradient-text mb-2 tracking-tighter group-hover:scale-110 transition-transform group-hover:glow-text">{stat.number}</div>
                                <div className="text-gray-300 font-bold uppercase tracking-tight text-xs sm:text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="section-padding relative overflow-hidden">
                <div className="absolute bottom-0 -right-40 w-80 h-80 bg-ocean-teal/5 rounded-full blur-[120px] animate-pulse"></div>
                <div className="container-tight relative z-10">
                    <h2 className="text-4xl md:text-5xl font-black text-white text-center mb-16 uppercase tracking-tight">
                        What Clients <span className="gradient-text">SAY</span>
                    </h2>

                    <div className="space-y-8">
                        {[
                            { name: 'Karan M.', text: 'The personalized approach made all the difference. I tried many programs before, but this is the only one that delivered real, lasting results.' },
                            { name: 'Sneha R.', text: 'As a busy professional, I needed something flexible. The online coaching fit perfectly into my schedule and the results exceeded my expectations.' },
                            { name: 'Aditya V.', text: 'From beginner to confident athlete in 6 months. The coach\'s expertise and constant support kept me motivated throughout the journey.' },
                        ].map((testimonial, index) => (
                            <div key={index} className="glass rounded-2xl p-8 sm:p-10 border border-white/5 hover:border-ocean-blue/30 transition-all border-l-4 border-l-ocean-blue group">
                                <p className="text-gray-300 text-lg sm:text-xl mb-6 italic leading-relaxed group-hover:text-white transition-colors">&quot;{testimonial.text}&quot;</p>
                                <p className="gradient-text font-black uppercase tracking-widest text-sm">— {testimonial.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding bg-[#0a0a0a]">
                <div className="container-tight text-center">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-8 uppercase tracking-tight leading-tight">
                        Your <br className="sm:hidden" /> <span className="gradient-text">Transformation</span> <br className="sm:hidden" /> Starts Now
                    </h2>
                    <p className="text-gray-300 text-xl mb-12 font-medium leading-relaxed">
                        Join the MuscleOcean family and become the next success story.
                    </p>
                    <Link
                        href="/contact"
                        className="bg-gradient-to-r from-ocean-blue via-ocean-teal to-ocean-indigo text-white px-12 py-5 rounded-2xl font-black text-xl hover:shadow-2xl hover:shadow-ocean-blue/40 transition-all hover:-translate-y-1 active:scale-95 uppercase tracking-widest inline-block"
                    >
                        START YOUR JOURNEY
                    </Link>
                </div>
            </section>
        </div>
    );
}
