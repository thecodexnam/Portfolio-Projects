import Link from 'next/link';

interface ServiceCardProps {
    icon: string;
    title: string;
    description: string;
    features: string[];
    price?: string;
    href: string;
}

export default function ServiceCard({ icon, title, description, features, price, href }: ServiceCardProps) {
    return (
        <div className="glass rounded-2xl p-8 hover:border-ocean-blue/50 transition-all duration-500 group hover:shadow-2xl hover:shadow-ocean-blue/20 hover:-translate-y-2 relative overflow-hidden flex flex-col h-full">
            <div className="absolute top-0 right-0 w-32 h-32 bg-ocean-blue/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-ocean-blue/10 transition-colors"></div>
            {/* Icon */}
            <div className="text-5xl mb-6 text-center">{icon}</div>

            {/* Content Group */}
            <div className="flex-grow flex flex-col justify-between text-center">
                <div>
                    {/* Title */}
                    <h3 className="text-2xl font-black text-white mb-3 group-hover:gradient-text transition-all duration-500 leading-tight">
                        {title.toUpperCase()}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 mb-8 leading-relaxed">
                        {description}
                    </p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 inline-block text-left mx-auto">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-start text-gray-300">
                            <svg className="w-5 h-5 text-ocean-blue mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>

                <div>
                    {/* Price */}
                    {price && (
                        <div className="text-4xl font-black gradient-text mb-8 tracking-tighter">
                            {price}
                        </div>
                    )}

                    {/* CTA Button */}
                    <Link
                        href={href}
                        className="block text-center bg-gradient-to-r from-ocean-blue via-ocean-teal to-ocean-indigo text-white px-6 py-4 rounded-xl font-bold hover:shadow-2xl hover:shadow-ocean-blue/40 transition-all active:scale-95"
                    >
                        GET STARTED
                    </Link>
                </div>
            </div>
        </div>
    );
}
