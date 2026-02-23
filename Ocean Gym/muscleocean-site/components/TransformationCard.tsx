import Image from 'next/image';

interface TransformationCardProps {
    beforeImage: string;
    afterImage: string;
    name: string;
    stats: string;
    testimonial: string;
}

const isPlaceholder = (src: string) => src.includes('placeholder');

function ImageSlot({ src, alt, label, labelClass }: { src: string; alt: string; label: string; labelClass: string }) {
    if (isPlaceholder(src)) {
        return (
            <div className="relative aspect-[3/4] overflow-hidden bg-[#1a1a1a] flex items-center justify-center">
                <span className={`absolute top-3 left-3 ${labelClass} backdrop-blur-sm text-white text-[10px] sm:text-xs font-black px-3 py-1 rounded-full z-10 tracking-widest`}>
                    {label}
                </span>
                <span className="text-gray-500 text-sm font-medium">Photo</span>
            </div>
        );
    }
    return (
        <div className="relative aspect-[3/4] overflow-hidden">
            <span className={`absolute top-3 left-3 ${labelClass} backdrop-blur-sm text-white text-[10px] sm:text-xs font-black px-3 py-1 rounded-full z-10 tracking-widest`}>
                {label}
            </span>
            <Image src={src} alt={alt} fill className="object-cover" />
        </div>
    );
}

export default function TransformationCard({ beforeImage, afterImage, name, stats, testimonial }: TransformationCardProps) {
    return (
        <div className="glass rounded-2xl overflow-hidden hover:border-ocean-blue/50 transition-all duration-300 group hover:shadow-xl hover:shadow-ocean-blue/10">
            {/* Before/After Images */}
            <div className="grid grid-cols-2 gap-[1px] bg-white/5">
                <ImageSlot src={beforeImage} alt={`${name} before`} label="BEFORE" labelClass="bg-red-500/90" />
                <div className="relative aspect-[3/4] overflow-hidden">
                    <span className="absolute top-3 right-3 bg-ocean-blue/90 backdrop-blur-sm text-white text-[10px] sm:text-xs font-black px-3 py-1 rounded-full z-10 tracking-widest">
                        AFTER
                    </span>
                    {isPlaceholder(afterImage) ? (
                        <div className="absolute inset-0 bg-[#1a1a1a] flex items-center justify-center">
                            <span className="text-gray-500 text-sm font-medium">Photo</span>
                        </div>
                    ) : (
                        <Image src={afterImage} alt={`${name} after`} fill className="object-cover" />
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-8 text-center">
                <div className="mb-6">
                    <h3 className="text-2xl font-black text-white mb-1 group-hover:gradient-text transition-all duration-500 uppercase tracking-tight">
                        {name}
                    </h3>
                    <p className="gradient-text font-bold text-lg">{stats}</p>
                </div>

                <p className="text-gray-400 text-sm italic leading-relaxed mb-6">
                    &quot;{testimonial}&quot;
                </p>

                {/* Star Rating */}
                <div className="flex justify-center mt-4">
                    {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    ))}
                </div>
            </div>
        </div>
    );
}
