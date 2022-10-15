import { BoltIcon, ChatBubbleBottomCenterTextIcon, GlobeAltIcon, ScaleIcon } from '@heroicons/react/24/outline'
import logoMixed from '../../../public/img/mixed@3x.png'
import logoIcon from '../../../public/img/icon@3x.png'
import logoyb from '../../../public/img/yellow-blue@3x.png'
import logoby from '../../../public/img/blue-yellow@3x.png'
import logoblack from '../../../public/img/black@3x.png'
import Image from 'next/future/image'
import LazyShow from '../../common/LazyShow'

export default function AboutFormDuo() {
  return (
    <div className="bg-white">
      <div className="flex items-center bg-white md:h-56">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <LazyShow>
              <div className="lg:text-center">
                <h2 className="text-lg font-semibold text-fdblue">Form Duo</h2>
                <h1 className="mt-4 text-3xl font-normal leading-normal tracking-tight text-gray-900 sm:text-2xl">
                    <span className='font-extrabold'>텍스트</span><span>부터</span> <span className='font-extrabold'>음성&영상</span><span>까지</span>
                </h1>
                <p className="mt-3 text-3xl font-bold leading-normal tracking-tight text-gray-900 sm:text-4xl">
                    새로운 설문 서비스를 경험하세요
                </p>
              </div>
            </LazyShow>
            {/* <LazyShow>
              <div className="mt-20">
                <dl className="space-y-10 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 md:space-y-0">
                    {list.map((item) => (
                    <div key={item.name} className="relative">
                        <dt>
                        <div className="absolute flex items-center justify-center w-12 h-12 text-white rounded-md bg-fdblue">
                            <item.icon className="w-6 h-6" aria-hidden="true" />
                        </div>
                        <p className="ml-16 text-lg font-medium leading-6 text-gray-900">{item.name}</p>
                        </dt>
                        <dd className="mt-2 ml-16 text-base text-gray-500">{item.description}</dd>
                    </div>
                    ))}
                </dl>
              </div>
            </LazyShow> */}
          </div>
      </div>
      {/* 로고 */}
      <div className="items-center max-w-2xl px-4 mx-auto sm:px-6 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <LazyShow>
          <div>
            {/* <h2 className="text-3xl font-bold text-center text-gray-900 sm:text-4xl">Form Duo</h2> */}
            <p className="mt-4 leading-loose text-gray-500">
                사용자들에게 좀 더 친화적인, 사용자들과 함께하는 새로운 차원의 설문 서비스를 만들어보면 좋겠다는 생각을 하게 되었고, 그러한 의미를 담아 서비스의 이름을 설문 조사의 ‘Form’ 과 ‘함께’ 라는 뜻의 ‘Duo’를 결합한 “폼듀(Form Duo)”라고 짓게 되었습니다.
            </p>
            <div className='flex mt-16'>
              <div className="flex items-center justify-center w-1/3 py-6 border-t border-b border-gray-200">
                <div> 
                  <div className='flex items-center content-center mb-4'>
                    <div className='w-16 h-16 mr-4 bg-fdblue'></div>
                    <p className='text-lg font-bold tracking-wider text-gray-500'>#7892B0</p>
                  </div>
                  <div className='flex items-center content-center'>
                    <div className='w-16 h-16 mr-4 bg-fdyellow'></div>
                    <p className='text-lg font-bold tracking-wider text-gray-500'>#FFD259</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center w-2/3 py-6 border-t border-b border-gray-200">
                <div className='content-center justify-center w-full px-16 '> 
                  <div className='flex items-center content-center mb-8 place-content-between'>
                    <Image src={logoIcon} className="w-16 h-auto "/>
                    <Image src={logoMixed} className="w-24 h-auto"/>
                    <Image src={logoby} className="w-32 h-auto"/>
                    <Image src={logoyb} className="w-32 h-auto"/>
                  </div>
                  <div className='flex items-center content-center'>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </LazyShow>
      </div>
        
      {/* color */}
      {/* <div className="grid items-center max-w-2xl grid-cols-1 px-4 py-12 mx-auto gap-y-16 gap-x-8 sm:px-6 sm:py-16 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Colors</h2>
          <p className="mt-4 text-gray-500">
            The walnut wood card tray is precision milled to perfectly fit a stack of Focus cards. The powder coated
            steel divider separates active cards from new ones, or can be used to archive important task lists.
          </p>

          <dl className="grid grid-cols-1 mt-16 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            {features.map((feature) => (
              <div key={feature.name} className="pt-4 border-t border-gray-200">
                <dt className="font-medium text-gray-900">{feature.name}</dt>
                <dd className="mt-2 text-sm text-gray-500">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
          <img
            src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-01.jpg"
            alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
            className="rounded-lg bg-neutral-100"
          />
          <img
            src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-02.jpg"
            alt="Top down view of walnut card tray with embedded magnets and card groove."
            className="rounded-lg bg-neutral-100"
          />
          <img
            src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-03.jpg"
            alt="Side of walnut card tray with card groove and recessed card area."
            className="rounded-lg bg-neutral-100"
          />
          <img
            src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-04.jpg"
            alt="Walnut card tray filled with cards and card angled in dedicated groove."
            className="rounded-lg bg-neutral-100"
          />
        </div>
      </div> */}
    </div>
  )
}
  