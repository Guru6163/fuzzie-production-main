'use client'

import { CardBody, CardContainer, CardItem } from '@/components/global/3d-card'
import { HeroParallax } from '@/components/global/connect-parallax'
import { ContainerScroll } from '@/components/global/container-scroll-animation'
import { InfiniteMovingCards } from '@/components/global/infinite-moving-cards'
import { LampComponent } from '@/components/global/lamp'
import Navbar from '@/components/global/navbar'
import { Button } from '@/components/ui/button'
import { clients, products } from '@/lib/constant'
import { CheckIcon } from 'lucide-react'
import React from 'react'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center bg-white text-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section className="w-full h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-100 z-0" />
        <div className="relative z-10 mt-[-80px] md:mt-[-40px]">
          <ContainerScroll
            titleComponent={
              <div className="text-center flex flex-col items-center mt-4">
                <Button
                  size="lg"
                  className="mb-6 px-6 py-4 text-lg rounded-full border border-gray-300 hover:bg-blue-50 transition duration-300"
                >
                  <span className="bg-gradient-to-r text-white text-transparent bg-clip-text font-semibold">
                    Start For Free Today
                  </span>
                </Button>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight bg-gradient-to-b from-gray-800 to-gray-400 text-transparent bg-clip-text max-w-3xl">
                  Automate Your Work With Fuzzie
                </h1>
              </div>
            }
          />
        </div>
      </section>

      {/* Clients Scroller */}
      <section className="w-full bg-gray-50 py-10">
        <InfiniteMovingCards
          className="mt-0"
          items={clients}
          direction="right"
          speed="slow"
        />
      </section>

      {/* Product Showcase */}
      <section className="w-full">
        <HeroParallax products={products} />
      </section>

      {/* Pricing Plans */}
      <section className="w-full py-20 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Choose Your Plan</h2>
          <p className="text-gray-600 mt-2">Flexible options for all stages</p>
        </div>
        <div className="flex flex-wrap justify-center gap-8 px-6">
          {[
            { title: 'Hobby', price: '$0' },
            { title: 'Pro Plan', price: '$29' },
            { title: 'Unlimited', price: '$99' },
          ].map((plan, idx) => (
            <CardContainer key={idx}>
              <CardBody className="bg-white border border-gray-200 rounded-xl shadow-md p-6 w-full md:w-[340px] transition hover:shadow-lg">
                <CardItem translateZ="50" className="text-xl font-semibold">
                  {plan.title}
                  <h2 className="text-5xl mt-2 font-bold text-blue-600">
                    {plan.price}
                  </h2>
                </CardItem>
                <CardItem
                  translateZ="60"
                  className="text-sm text-gray-600 mt-4"
                >
                  Everything you need to get started:
                  <ul className="mt-4 flex flex-col gap-2 text-left">
                    <li className="flex items-center gap-2">
                      <CheckIcon className="h-4 w-4 text-green-500" />
                      3 Free automations
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="h-4 w-4 text-green-500" />
                      100 tasks per month
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="h-4 w-4 text-green-500" />
                      Two-step Actions
                    </li>
                  </ul>
                </CardItem>
                <div className="flex justify-between items-center mt-6">
                  <CardItem
                    translateZ={20}
                    as="button"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Try now →
                  </CardItem>
                  <CardItem
                    translateZ={20}
                    as="button"
                    className="px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
                  >
                    Get Started Now
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          ))}
        </div>
      </section>

      {/* Lamp Decoration */}
      <section className="w-full py-24 bg-gradient-to-b from-gray-50 to-white">
        <LampComponent />
      </section>
    </main>
  )
}
