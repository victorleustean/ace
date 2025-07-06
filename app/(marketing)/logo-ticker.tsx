import acmeLogo from '@/public/logo-acme.png'
import quantumLogo from '@/public/logo-quantum.png'
import echoLogo from '@/public/logo-echo.png'
import celestialLogo from '@/public/logo-celestial.png'
import pulseLogo from '@/public/logo-pulse.png'
import apexLogo from '@/public/logo-apex.png'
import Image from 'next/image'

export const LogoTicker = () => {
    return (
        <div className="py-8 md:py-12 bg-white">
            <div className="container">
                <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black,transparent)]">
                    <div className="flex gap-14 flex-none pr-14 animate-logo-cloud">
                        <Image src={acmeLogo} alt='Acme Logo' className="h-8 w-auto" />
                        <Image src={quantumLogo} alt='Quantum Logo' className="h-8 w-auto" />
                        <Image src={echoLogo} alt='Echo Logo' className="h-8 w-auto" />
                        <Image src={celestialLogo} alt='Celestial Logo' className="h-8 w-auto" />
                        <Image src={pulseLogo} alt='Pulse Logo' className="h-8 w-auto" />
                        <Image src={apexLogo} alt='Apex Logo' className="h-8 w-auto" />
                        {/* Duplicate for seamless loop */}
                        <Image src={acmeLogo} alt='Acme Logo' className="h-8 w-auto" />
                        <Image src={quantumLogo} alt='Quantum Logo' className="h-8 w-auto" />
                        <Image src={echoLogo} alt='Echo Logo' className="h-8 w-auto" />
                        <Image src={celestialLogo} alt='Celestial Logo' className="h-8 w-auto" />
                        <Image src={pulseLogo} alt='Pulse Logo' className="h-8 w-auto" />
                        <Image src={apexLogo} alt='Apex Logo' className="h-8 w-auto" />
                    </div>
                </div>
            </div>
        </div>
    )
}