import Link from 'next/link';
import Image from 'next/image';
import ServiceCard from '@/components/ServiceCard';
import TransformationCard from '@/components/TransformationCard';
import ContactForm from '@/components/ContactForm';

export default function HomePage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#050505] via-[#0a0a0a] to-[#050505] z-0">
          <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-5"></div>
          {/* Background Glows */}
          <div className="absolute top-1/4 -left-20 w-80 h-80 bg-ocean-blue/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-ocean-teal/20 rounded-full blur-[120px] animate-pulse"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container-wide text-center py-20 sm:py-24">
          <div className="space-y-8 sm:space-y-10">
            {/* Badges */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8">
              <span className="bg-white/5 border border-ocean-blue/50 text-ocean-blue px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-md">
                🏆 5+ Men&apos;s Physique Titles
              </span>
              <span className="bg-white/5 border border-ocean-blue/50 text-ocean-blue px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-md">
                💪 100+ Client Transformations
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] tracking-tighter">
              Build Your Best <br className="hidden md:block" /> Physique With{' '}
              <span className="gradient-text glow-text uppercase">
                Muscle Ocean
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto px-4 font-medium leading-relaxed">
              Professional Men&apos;s Physique Athlete | Online Personal Training | Custom Diet & Workout Plans
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <Link
                href="#contact"
                className="bg-gradient-to-r from-ocean-blue via-ocean-teal to-ocean-indigo text-white px-12 py-5 rounded-2xl font-black text-xl hover:shadow-2xl hover:shadow-ocean-blue/40 transition-all w-full sm:w-auto hover:-translate-y-1 active:scale-95 uppercase tracking-widest"
              >
                Start Your Journey
              </Link>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white px-10 py-5 rounded-2xl font-black text-xl hover:shadow-lg hover:shadow-[#25D366]/50 transition-all w-full sm:w-auto flex items-center justify-center gap-3 hover:-translate-y-1 active:scale-95 uppercase tracking-widest"
              >
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Now
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-float">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-bold tracking-widest text-ocean-blue/60 uppercase">Explore</span>
            <svg className="w-6 h-6 text-ocean-blue opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Coach Highlight Section */}
      <section className="section-padding bg-[#0f0f0f]">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-ocean-blue/20 to-ocean-teal/20 z-10 group-hover:opacity-40 transition-opacity"></div>
              <div className="absolute -inset-[2px] bg-gradient-to-br from-ocean-blue to-ocean-teal rounded-2xl opacity-20 blur-sm z-0"></div>
              <div className="relative z-10 w-full h-full bg-[#1a1a1a] flex items-center justify-center text-gray-500 text-sm sm:text-base p-4 text-center border border-white/10 hover:border-white/20 transition-colors">
                [Coach Competition Photo - Replace with actual image]
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6 text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Why Trust <span className="text-ocean-blue">MuscleOcean</span>?
              </h2>
              <p className="text-gray-300 text-lg">
                With over 5 years of competitive bodybuilding experience and multiple Men&apos;s Physique championship titles, I&apos;ve mastered the science and art of body transformation. Now, I&apos;m here to help you achieve your dream physique.
              </p>

              {/* Features List */}
              <div className="space-y-4 inline-block text-left mx-auto lg:mx-0">
                {[
                  'Custom Workout Plans tailored to your goals',
                  'Custom Diet Plans based on your lifestyle',
                  'Weekly Check-ins & Progress Tracking',
                  'WhatsApp Support for instant guidance',
                  'Proven methods used by champions',
                  'Beginner to advanced level coaching'
                ].map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <svg className="w-6 h-6 text-ocean-blue mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-300 text-lg">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  href="/about"
                  className="inline-block text-ocean-blue font-semibold text-lg hover:text-ocean-teal transition-colors"
                >
                  Learn More About the Coach →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Online Coaching <span className="text-ocean-blue">Services</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              All plans are fully customized based on your goals, body type & lifestyle
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            <ServiceCard
              icon="💪"
              title="1:1 Online Coaching"
              description="Personalized monthly coaching with custom workouts, diet plans, and weekly check-ins to keep you on track."
              features={[
                'Custom workout program',
                'Personalized meal plans',
                'Weekly progress check-ins',
                'WhatsApp support',
                'Form correction videos'
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
                'Lifetime support group access'
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
                'Post-show recovery plan'
              ]}
              price="₹19,999"
              href="/contact"
            />
          </div>
        </div>
      </section>

      {/* Transformations Preview Section */}
      <section className="section-padding bg-[#0f0f0f]">
        <div className="container-wide">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
              Real People. Real Results.
            </h2>
            <p className="text-xl text-ocean-blue font-semibold">
              Welcome to the MuscleOcean.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-12">
            <TransformationCard
              beforeImage="/placeholder-before.jpg"
              afterImage="/placeholder-after.jpg"
              name="Rahul S."
              stats="Lost 12 kg in 16 weeks"
              testimonial="Best decision I ever made. The coach completely transformed my body and mindset."
            />
            <TransformationCard
              beforeImage="/placeholder-before.jpg"
              afterImage="/placeholder-after.jpg"
              name="Amit K."
              stats="Gained 8 kg muscle in 12 weeks"
              testimonial="Professional guidance that actually works. Highly recommend MuscleOcean coaching!"
            />
            <TransformationCard
              beforeImage="/placeholder-before.jpg"
              afterImage="/placeholder-after.jpg"
              name="Vikram M."
              stats="Lost 15 kg in 20 weeks"
              testimonial="Changed my life completely. The support and expertise are unmatched."
            />
          </div>

          <div className="text-center">
            <Link
              href="/transformations"
              className="inline-block bg-gradient-to-r from-ocean-blue to-ocean-teal text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-ocean-blue/40 transition-all hover:-translate-y-0.5"
            >
              See All Transformations
            </Link>
          </div>
        </div>
      </section>

      {/* Gym Section */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-6 text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                <span className="text-ocean-blue">MuscleOcean</span> Gym
              </h2>
              <p className="text-2xl text-gray-300 font-semibold">
                Where Champions Are Built
              </p>
              <p className="text-gray-400 text-lg">
                State-of-the-art fitness facility equipped with premium equipment, dedicated posing room, and expert trainers. Whether you&apos;re training for competition or general fitness, MuscleOcean Gym has everything you need.
              </p>

              <div className="space-y-3 inline-block text-left mx-auto lg:mx-0">
                <div className="flex items-center text-gray-300">
                  <svg className="w-6 h-6 text-ocean-blue mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Premium free weights & machines
                </div>
                <div className="flex items-center text-gray-300">
                  <svg className="w-6 h-6 text-ocean-blue mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Dedicated posing room
                </div>
                <div className="flex items-center text-gray-300">
                  <svg className="w-6 h-6 text-ocean-blue mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Cardio zone with latest equipment
                </div>
                <div className="flex items-center text-gray-300">
                  <svg className="w-6 h-6 text-ocean-blue mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Expert trainers on-site
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/gym"
                  className="inline-block text-ocean-blue font-semibold text-lg hover:text-ocean-teal transition-colors"
                >
                  Explore the Gym →
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden order-first lg:order-last group">
              <div className="absolute inset-0 bg-gradient-to-br from-ocean-blue/10 to-ocean-teal/10 z-10 group-hover:opacity-30 transition-opacity"></div>
              <div className="absolute -inset-[2px] bg-gradient-to-br from-ocean-blue to-ocean-indigo rounded-2xl opacity-10 blur-sm z-0"></div>
              <div className="relative z-10 w-full h-full bg-[#1a1a1a] flex items-center justify-center text-gray-500 text-sm sm:text-base p-4 text-center border border-white/5 hover:border-white/20 transition-colors">
                [Gym Facility Photo - Replace with actual image]
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-[#0f0f0f] relative overflow-hidden">
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-ocean-blue/5 rounded-full blur-[120px] animate-pulse"></div>
        <div className="container-wide relative z-10">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              What Clients <span className="text-ocean-blue">Say</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {[
              {
                name: 'Priya S.',
                text: 'He changed my body and mindset. The personalized approach made all the difference.',
                rating: 5
              },
              {
                name: 'Rohan P.',
                text: 'Best coach I\'ve worked with. Results speak for themselves. Highly professional!',
                rating: 5
              },
              {
                name: 'Arjun T.',
                text: 'From beginner to stage-ready in 6 months. MuscleOcean coaching is world-class.',
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="glass rounded-2xl p-8 border border-white/10 hover:border-ocean-blue/30 transition-colors">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">&quot;{testimonial.text}&quot;</p>
                <p className="text-ocean-blue font-semibold">— {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA / Contact Form Section */}
      <section id="contact" className="section-padding relative overflow-hidden">
        <div className="absolute bottom-0 -left-40 w-96 h-96 bg-ocean-teal/5 rounded-full blur-[120px] animate-pulse"></div>
        <div className="container-tight relative z-10">
          <div className="text-center mb-10 lg:mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Ready to Start Your <span className="text-ocean-blue">Transformation</span>?
            </h2>
            <p className="text-gray-400 text-lg">
              Fill the form below and the coach will contact you within 24 hours.
            </p>
          </div>

          <ContactForm />
        </div>
      </section>
    </div>
  );
}
