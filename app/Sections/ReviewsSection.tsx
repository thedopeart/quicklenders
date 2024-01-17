'use client'

// ** SplideJS Imports
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'

// ** Icon Imports
import { MdStar } from 'react-icons/md'

const reviews = [
    {
        name: 'Kelsey McKay',
        handle: '@user.name',
        subject: "Modern look & trending design",
        content: 'Best Cafe in the neighborhood when it comes to authentic taste and prices, love the food!!',
        image: '',
        rating: <><MdStar aria-hidden="true" /><MdStar aria-hidden="true" /><MdStar aria-hidden="true" /><MdStar aria-hidden="true" /><MdStar aria-hidden="true" /></>,
    },
    {
        name: 'Alex Villareal',
        handle: '@user.name',
        subject: "Modern look & trending design",
        content: 'One of my favorite places in Portland. Great food, great service 👍',
        image: '',
        rating: <><MdStar aria-hidden="true" /><MdStar aria-hidden="true" /><MdStar aria-hidden="true" /><MdStar aria-hidden="true" /><MdStar aria-hidden="true" /></>,
    },
    {
        name: 'Alex Anisimov',
        handle: '@user.name',
        subject: "Modern look & trending design",
        content: 'Great delicious food with huge menu to choose from. Great people, great atmosphere. Highly recommend you stop by this place!',
        image: '',
        rating: <><MdStar aria-hidden="true" /><MdStar aria-hidden="true" /><MdStar aria-hidden="true" /><MdStar aria-hidden="true" /><MdStar aria-hidden="true" /></>,
    },
    {
        name: 'Adam Franek',
        handle: '@user.name',
        subject: "Modern look & trending design",
        content: 'Delicious food and the owner is the friendliest person. Come, enjoy great good and support a good business.',
        image: '',
        rating: <><MdStar aria-hidden="true" /><MdStar aria-hidden="true" /><MdStar aria-hidden="true" /><MdStar aria-hidden="true" /><MdStar aria-hidden="true" /></>,
    },
    {
        name: 'Grimm Rodriguez',
        handle: '@user.name',
        subject: "Modern look & trending design",
        content: 'Ordered today for pick up, oh my goodness this food is so good. I have a new favorite spot to eat. Also everyone working there is so sweet! 10/10. Eating left overs now and it\'s still SO GOOD.',
        image: '',
        rating: <><MdStar aria-hidden="true" /><MdStar aria-hidden="true" /><MdStar aria-hidden="true" /><MdStar aria-hidden="true" /><MdStar aria-hidden="true" /></>,
    },
    {
        name: 'Drew Roberts',
        handle: '@user.name',
        subject: "Modern look & trending design",
        content: 'Such a cool spot! Good coffee and even better conversation. Can\'t wait to go back!!',
        image: '',
        rating: <><MdStar aria-hidden="true" /><MdStar aria-hidden="true" /><MdStar aria-hidden="true" /><MdStar aria-hidden="true" /><MdStar aria-hidden="true" /></>,
    },
    {
        name: 'Greg',
        handle: '@user.name',
        subject: "Modern look & trending design",
        content: 'I had a Delicious panini nirvana . Highly recommend one.  Was a wonderful experience and will be back to try more.  Was greeted when I walked in and made to feel at home.',
        image: '',
        rating: <><MdStar aria-hidden="true" /><MdStar aria-hidden="true" /><MdStar aria-hidden="true" /><MdStar aria-hidden="true" /><MdStar aria-hidden="true" /></>,
    }
]

const ReviewsSection = () => {

    const options = {
        type: 'loop',
        label: 'Reviews Carousel',
        arrows: false,
        pagination: true,
        autoplay: true,
        perPage: 1,
        mediaQuery: 'min',
        breakpoints: {
            768: {
                perPage: 2,
            },
            1280: {
                perPage: 3,
            }
        }
    }


    return (
        <section className="w-full py-10 lg:py-20">
            <div className="container">
                <hgroup className="text-center mb-20">
                    <p className="text-sm font-bold leading-10 uppercase tracking-widest">Testimonial</p>
                    <h2 className="text-4xl font-bold leading-normal -tracking-wide">Meet Client Satisfaction</h2>
                </hgroup>
                <Splide
                    hasTrack={false}
                    options={options}
                >
                    <SplideTrack>
                        {
                            reviews.map((review) => (
                                <SplideSlide key={review.name}>
                                    <div className="px-8">
                                        <div className="transition-all duration-500 p-8 bg-white hover:shadow-[0px_6px_47px_rgba(38,78,118,0.10)]">
                                            <div className="flex items-center justify-start mb-2 text-yellow-500">{review.rating}</div>
                                            <div className="font-bold text-theme-dark-gray mb-5">{review.subject}</div>
                                            <p className="text-theme-dark-gray text-lg leading-loose mb-8">{review.content}</p>
                                            <div className="flex items-center">
                                                <div className="mr-2">
                                                    <div className="w-14 h-14 rounded-full bg-theme-dark-gray"></div>
                                                </div>
                                                <div>
                                                    <div className="font-bold text-theme-primary-dark">{review.name}</div>
                                                    <div className="text-[#25A0FF] text-sm font-medium">{review.handle}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SplideSlide>
                            ))
                        }
                    </SplideTrack>
                </Splide>
            </div>
        </section>
    )
}

export default ReviewsSection