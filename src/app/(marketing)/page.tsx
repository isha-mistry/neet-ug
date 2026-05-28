import { getHomeContent } from "@/lib/data/site";
import { getFaqContent, getInfoPageBySlug } from "@/lib/data/content";
import { HomeHero } from "@/components/features/home/HomeHero";
import { ExploreEntryPoints } from "@/components/features/home/ExploreEntryPoints";
import { TrustHighlights } from "@/components/features/home/TrustHighlights";
import { FaqList } from "@/components/features/content/FaqList";
import Image from "next/image";

export default function HomePage() {
  const home = getHomeContent();
  const aboutPage = getInfoPageBySlug("about");
  const howItWorksPage = getInfoPageBySlug("how-it-works");
  const faq = getFaqContent();

  return (
    <>
      <section className="relative min-h-[600px] flex items-center overflow-hidden bg-surface-container-lowest">
        <div className="max-w-container-max mx-auto px-gutter w-full">
          <HomeHero content={home.hero} />
        </div>
      </section>

      <section className="py-stack-lg bg-surface">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="mb-12">
            <span className="text-primary font-label-md text-label-md tracking-wider uppercase mb-2 block">
              Explore
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">
              Pick a path that fits your decision style.
            </h2>
            <p className="text-on-surface-variant font-body-md text-body-md mt-2">
              Browse the full database, focus on a state, jump straight to a
              category, or compare colleges head to head.
            </p>
          </div>
          <ExploreEntryPoints entries={home.exploreEntryPoints} />
        </div>
      </section>

      <section className="py-stack-lg bg-surface-container-lowest">
        <div className="max-w-container-max mx-auto px-gutter">
          <TrustHighlights content={home.trustHighlights} />
        </div>
      </section>

      {aboutPage ? (
        <section className="py-stack-lg bg-surface" id="about">
          <div className="max-w-container-max mx-auto px-gutter">
            <div className="bg-surface-container-lowest rounded-3xl overflow-hidden border border-outline-variant shadow-lg flex flex-col lg:flex-row">
              <div className="flex-1 p-stack-lg">
                <span className="text-primary font-label-md text-label-md tracking-wider uppercase mb-2 block">
                  About MedSeat
                </span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface mb-6">
                  {aboutPage.sections[0]?.heading || "Empowering MBBS Aspirants"}
                </h2>
                <p className="text-on-surface-variant font-body-md text-body-md mb-8">
                  {aboutPage.description}
                </p>
                <div className="space-y-4">
                  <div className="p-4 bg-surface-container rounded-xl flex items-start gap-4">
                    <div className="bg-primary text-on-primary w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-sm">target</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-on-surface">Our Mission</h4>
                      <p className="text-on-surface-variant text-body-sm">
                        {aboutPage.sections[0]?.body}
                      </p>
                    </div>
                  </div>
                  <div className="p-4 bg-surface-container rounded-xl flex items-start gap-4">
                    <div className="bg-secondary text-on-primary w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-sm">fact_check</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-on-surface">What We Focus On</h4>
                      <div className="text-on-surface-variant text-body-sm">
                        <ul className="list-disc pl-4">
                          {aboutPage.sections[1]?.points?.map((pt, i) => (
                            <li key={i}>{pt}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/3 bg-primary-container/10 flex items-center justify-center p-stack-lg relative overflow-hidden">
                <Image
                  alt="Medical College Illustration"
                  className="w-full h-auto max-w-[300px] object-contain drop-shadow-2xl"
                  src={"/brand/home/illustration.png"}
                  width={300}
                  height={300}
                />
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {howItWorksPage ? (
        <section className="py-stack-lg" id="how-it-works">
          <div className="max-w-container-max mx-auto px-gutter">
            <div className="text-center mb-16">
              <span className="text-primary font-label-md text-label-md tracking-wider uppercase mb-2 block">
                Platform Guide
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">
                {howItWorksPage.title}
              </h2>
              <p className="text-on-surface-variant font-body-md text-body-md mt-2">
                {howItWorksPage.description}
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-stack-md relative">
              <div className="hidden lg:block absolute top-1/2 left-0 w-full h-[2px] bg-outline-variant -z-10 transform -translate-y-1/2"></div>
              {howItWorksPage.sections.map((section, index) => {
                const icons = ["search", "compare_arrows", "rule"];
                return (
                  <div key={index} className="bg-surface-container-lowest border border-outline-variant p-8 rounded-2xl text-center relative">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-primary text-on-primary rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                      {index + 1}
                    </div>
                    <div className="mb-6 mt-4">
                      <span className="material-symbols-outlined text-5xl text-primary">
                        {icons[index] || "info"}
                      </span>
                    </div>
                    <h3 className="font-headline-md text-headline-md text-on-surface mb-3">
                      {section.heading.replace(/Step \d+ — /, "")}
                    </h3>
                    <p className="text-on-surface-variant text-body-sm">
                      {section.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      <section className="py-stack-lg bg-surface" id="faq">
        <div className="max-w-3xl mx-auto px-gutter">
          <div className="text-center mb-12">
            <span className="text-primary font-label-md text-label-md tracking-wider uppercase mb-2 block">
              Help Center
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">
              {faq.title}
            </h2>
          </div>
          <FaqList items={faq.items} />
        </div>
      </section>

      <section className="py-stack-lg bg-surface-container-lowest" id="contact">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="flex flex-col lg:flex-row gap-stack-lg">
            <div className="lg:w-1/2">
              <span className="text-primary font-label-md text-label-md tracking-wider uppercase mb-2 block">
                Contact Us
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-6">
                Contact MedSeat
              </h2>
              <p className="text-on-surface-variant font-body-md text-body-md mb-8">
                Connect with us for support, corrections, partnership requests or product feedback. Our team is dedicated to helping you navigate the admission journey.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-container text-on-primary rounded-xl flex items-center justify-center">
                    <span className="material-symbols-outlined">mail</span>
                  </div>
                  <div>
                    <div className="font-semibold">Support</div>
                    <div className="text-on-surface-variant text-body-sm">support@medseat.example</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-secondary-container text-on-secondary-container rounded-xl flex items-center justify-center">
                    <span className="material-symbols-outlined">schedule</span>
                  </div>
                  <div>
                    <div className="font-semibold">Working Hours</div>
                    <div className="text-on-surface-variant text-body-sm">Mon-Sat, 10 AM - 7 PM</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 bg-surface p-8 rounded-3xl border border-outline-variant">
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-label-md font-label-md text-on-surface mb-2">Full Name</label>
                    <input className="w-full bg-surface-container-lowest border-outline-variant rounded-xl focus:ring-primary focus:border-primary px-4 py-3 border outline-none" placeholder="Enter your name" type="text" />
                  </div>
                  <div>
                    <label className="block text-label-md font-label-md text-on-surface mb-2">Email Address</label>
                    <input className="w-full bg-surface-container-lowest border-outline-variant rounded-xl focus:ring-primary focus:border-primary px-4 py-3 border outline-none" placeholder="Enter your email" type="email" />
                  </div>
                </div>
                <div>
                  <label className="block text-label-md font-label-md text-on-surface mb-2">Message</label>
                  <textarea className="w-full bg-surface-container-lowest border-outline-variant rounded-xl focus:ring-primary focus:border-primary px-4 py-3 border outline-none" placeholder="How can we help?" rows={4}></textarea>
                </div>
                <button className="w-full bg-primary text-on-primary font-semibold py-4 rounded-xl hover:shadow-lg transition-all" type="submit">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
