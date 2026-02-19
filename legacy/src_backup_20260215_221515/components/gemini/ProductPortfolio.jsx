import React, { useState, useMemo, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const RAW_TEXT_BLOCK = `
Ambisonic10BP-IG-70V$ 2,043.00$ 4,085.0010BP-IG-70v paired with JB1300each (ea)LandscapeSubwooferSeasonsOutdoor
Ambisonic10BP-IG-8ohm$ 1,828.00$ 3,655.0010 Band Pass/In Ground Subwoofer/ Copper Canopyeach (ea)LandscapeSubwooferSeasonsOutdoor
Ambisonic10HDR-AW-70V$ 1,452.00$ 2,903.0010HDR-AW JB1300 10RS350each (ea)LandscapeSubwooferSeasonsOutdoor
Ambisonic10HDR-AW-8ohm$ 1,237.00$ 2,473.0010HDR-AW 10RS350each (ea)LandscapeSubwooferSeasonsOutdoor
Ambisonic12BP-IG-8ohm$ 2,258.00$ 4,515.00Ambisonic Systems - 12" Outdoor In-Ground Double Tuned Subwoofer.each (ea)LandscapeSubwooferSeasonsOutdoor
Ambisonic12HDR-AW-70V$ 2,365.00$ 4,730.0012HDR-AW JB1300 12RS1066each (ea)LandscapeSubwooferSeasonsOutdoor
Ambisonic12HDR-AW-8ohm$ 2,150.00$ 4,300.0012HDR-AW 12RS1066each (ea)LandscapeSubwooferSeasonsOutdoor
Ambisonic6.5HD-AW-L-70V-BK$ 1,075.00$ 2,150.001x6.5HD-AW-8ohm-Black 1x6.5HDSPIKE-B 1x100WTF 1xHDACCS-Beach (ea)Line-ArraySpeakerHDOutdoor
Ambisonic6.5HD-AW-L-8ohm-BK$ 968.00$ 1,935.001x6.5HD-AW-8ohm-Black 1x6.5HDSPIKE-Beach (ea)Line-ArraySpeakerHDOutdoor
Ambisonic6.5HD-AW-S-70V-BK$ 1,075.00$ 2,150.001x6.5HD-AW-8ohm-Black 1xBRK-6.5-SM-B 1x100WTF 1xHDACCS-Beach (ea)Line-ArraySpeakerHDOutdoor
Ambisonic6.5HD-AW-S-8ohm-BK$ 968.00$ 2,150.001x6.5HD-AW-8ohm-Black 1xBRK-6.5-SM-Beach (ea)Line-ArraySpeakerHDOutdoor
Ambisonic6.5HD2-AW-L-4ohm-BK$ 1,935.00$ 3,870.002x6.5HD-AW-8ohm-Black 1x6.5HDSPIKE-B 2x6.5HDCP-Beach (ea)Line-ArraySpeakerHDOutdoor
Ambisonic6.5HD2-AW-L-70V-BK$ 2,150.00$ 4,300.002x6.5HD-AW-8ohm-White 1x6.5HDSPIKE-B 2x6.5HDCP-B 2x100WTF 2xHDACCS-Beach (ea)Line-ArraySpeakerHDOutdoor
Ambisonic6.5HD2-AW-S-4ohm-BK$ 1,935.00$ 3,870.002x6.5HD-AW-8ohm-Black 1xBRK-6.5-SM-B 2x6.5HDCP-Beach (ea)Line-ArraySpeakerHDOutdoor
Ambisonic6.5HD2-AW-S-70V-BK$ 2,150.00$ 4,300.002x6.5HD-AW-8ohm-Black 1xBRK-6.5-SM-B 2x6.5HDCP-B 2x100WTF 2xHDACCS-Beach (ea)Line-ArraySpeakerHDOutdoor
Origin AcousticsA1250$ 807.00$ 1,720.00Amplifiers - 12-Channel Amplifier with 50w per channel in a 1U Design.each (ea)ElectronicsAmplifierFoundationIndoor
AmbisonicALSB106$ 1,613.00$ 3,360.001X ALSB106HS 1X ALSB106HT 1X ALSB106SL-BLeach (ea)BollardSpeakerSeasonsOutdoor
AmbisonicALSB64$ 807.00$ 1,882.00Ambisonic bollards 6" burial subwoofer+4" midrange with Black color and Hexagon shapeeach (ea)BollardSpeakerSeasonsOutdoor
AmbisonicALSB85$ 1,210.00$ 2,634.00Ambisonic bollards 8" burial subwoofer+5.25" midrange with Black color and Hexagon shapeeach (ea)BollardSpeakerSeasonsOutdoor
AmbisonicAM1000ICA$ 1,075.00$ 2,875.00Amisonic Marquee In-Ceiling 10" Angled Speakereach (ea)In-CeilingSpeakerMarqueeIndoor
AmbisonicAM3600IW$ 1,935.00$ 5,250.00In-Wall LCR Front/Surround Ambisonic Marquee Theater Speakereach (ea)In-WallSpeakerMarqueeIndoor
AmbisonicAM3600OW$ 1,774.00$ 4,750.00On-Wall LCR Front/Surround Ambisonic Marquee Theater Speakereach (ea)On-WallSpeakerMarqueeIndoor
AmbisonicAM5600IW$ 2,903.00$ 7,875.00In-Wall LCR Front Ambisonic Marquee Theater Speaker (Full-Range)each (ea)In-WallSpeakerMarqueeIndoor
AmbisonicAM5600OW$ 2,688.00$ 7,125.00On-Wall LCR Front Ambisonic Marquee Theater Speaker (Full-Range)each (ea)On-WallSpeakerMarqueeIndoor
AmbisonicAM650OWA$ 914.00$ 2,465.00Ambisonic Marquee On-Wall Angled 6.5" Box Speakereach (ea)On-WallSpeakerMarqueeIndoor
AmbisonicAMD10IWSUB$ 1,344.00$ 3,875.00Ambisonic Marquee In-Wall Dual 10" Subwoofereach (ea)In-WallSubwooferMarqueeIndoor
AmbisonicAMD10OWSUB$ 1,237.00$ 3,625.00Ambisonic Marquee On-Wall Dual 10" Subwoofereach (ea)On-WallSubwooferMarqueeIndoor
Origin AcousticsBlends602$ 650.00$ 1,625.006.5" 2-way BLENDS Invisible SpeakerPair (pr)InvisibleSpeakerBLENDSIndoor
Origin AcousticsBlends800Sub$ 650.00$ 1,625.008" Invisible BLENDS Subwoffer (2x)each (ea)InvisibleSubwooferBLENDSIndoor
Origin AcousticsBlends802$ 860.00$ 2,125.008" 2-way BLENDS Invisible SpeakerPair (pr)InvisibleSpeakerBLENDSIndoor
Origin AcousticsBlends803$ 1,075.00$ 2,625.008" 3-way BLENDS Invisible SpeakerPair (pr)InvisibleSpeakerBLENDSIndoor
Origin AcousticsBlendsCSUB10$ 800.00$ 2,000.00In Wall - Slot Ported Subeach (ea)InvisibleSubwooferBLENDSIndoor
Origin AcousticsC63$ 113.00$ 328.00Composer Thinline Series - Rectangular In-Wall 2-Way Loudspeaker, Pivoting Aluminum Tweeter, 4x8" Poly-Rubber Woofer and Patented SpringLock Tool-less Mounting System.each (ea)In-WallSpeakerComposerIndoor
Origin AcousticsC65$ 146.00$ 420.00Composer Thinline Series - Rectangular In-Wall 2-Way Loudspeaker, Pivoting Aluminum Tweeter, 4x8" IMG Woofer and Patented SpringLock Tool-less Mounting System.each (ea)In-WallSpeakerComposerIndoor
Origin AcousticsC65EX$ 178.00$ 511.00Explorer Series - Rectangular In-Wall 2-Way Loudspeaker with 4x8" IMG Woofer, Pivoting Aluminum Tweeter and Patented SpringLock Tool-less Mounting System.each (ea)In-WallSpeakerComposerMarine
Origin AcousticsC67$ 178.00$ 511.00Composer Thinline Series - Rectangular In-Wall 2-Way Loudspeaker, Pivoting Silk DPSD Tweeter, 4x8" Glass Fiber Woofer and Patented SpringLock Tool-less Mounting System.each (ea)In-WallSpeakerComposerIndoor
Origin AcousticsC69$ 301.00$ 855.00Composer Thinline Series - Rectangular In-Wall 2-Way Loudspeaker, Pivoting Silk DPSD Tweeter, 4x8" Kevlar Woofer and Patented SpringLock Tool-less Mounting System.each (ea)In-WallSpeakerComposerIndoor
Origin AcousticsCIW61$ 183.00$ 527.00Composer In-Wall Series - Rectangular In-Wall 2 Way Loudspeaker, Traditional Footprint, Pivoting Silk Tweeter, 6.5" Poly-Rubber Woofer (Pair).Pair (pr)In-WallSpeakerComposerIndoor
Origin AcousticsCIW63$ 232.00$ 667.00Composer In-Wall Series - Rectangular In-Wall 2 Way Loudspeaker, Traditional Footprint, Pivoting Aluminum Tweeter, 6.5" IMG Woofer (Pair).Pair (pr)In-WallSpeakerComposerIndoor
Origin AcousticsCIW65$ 291.00$ 834.00Composer In-Wall Series - Rectangular In-Wall 2 Way Loudspeaker, Traditional Footprint, Pivoting Silk DPSD Tweeter, 6.5" IMG Woofer (Pair).Pair (pr)In-WallSpeakerComposerIndoor
Origin AcousticsCSUB10R EX$ 968.00$ 1,935.00Explorer Retrofit In-Wall Subwoofer with 10" aluminum woofer and aluminum slide enclosure for post-construction installation.each (ea)In-WallSubwooferComposerMarine
Origin AcousticsD101$ 307.00$ 882.00Director 10" Series - In-Ceiling Loudspeaker with an 10" Poly-Rubber Woofer, Pivoting Silk Dome Tweeter and Tool-less Installation.each (ea)In-CeilingSpeakerDirectorIndoor
Origin AcousticsD103DT$ 420.00$ 1,204.00D103DT in-ceiling speaker has dual 1" Aluminum tweeters and a 10" IMG woofer.each (ea)In-CeilingSpeakerDirectorIndoor
Origin AcousticsD105$ 490.00$ 1,414.00Director 10" Series - Fully Pivoting 3-Way In-Ceiling Loudspeaker with a 10" IMG Woofer, Exclusive DPSD tweeter Technology and Tool-Less Installationeach (ea)In-CeilingSpeakerDirectorIndoor
Origin AcousticsD105EX$ 559.00$ 1,602.00Explorer Series - Fully Pivoting 3-Way In-Ceiling Loudspeaker with 10" IMG Woofer, Aluminum Tweeter, Extended Weather Protection, and Tool-Less Installation.each (ea)In-CeilingSpeakerDirectorMarine
Origin AcousticsD107$ 629.00$ 1,828.00Director 10" Series - Fully Pivoting 3-Way In-Ceiling Loudspeaker with a 10" Glass Fiber Woofer, Exclusive DPSD Tweeter Technology and Tool-Less Installationeach (ea)In-CeilingSpeakerDirectorIndoor
Origin AcousticsD109$ 748.00$ 2,150.00Director 10" Series - Fully Pivoting 3-Way In-Ceiling Loudspeaker with a 10" Kevlar Woofer, Exclusive DPSD Tweeter Technology and Tool-Less Installation.each (ea)In-CeilingSpeakerDirectorIndoor
Origin AcousticsD39$ 178.00$ 511.00Director 3" Minimal Opening In-Ceiling Speaker with Kevlar 3" Woofer, 3/4" silk DPSD tweeter, and Tool-Less Installation System. Includes both Square and Round 4 1/4" Magnetic Grilles.each (ea)In-CeilingSpeakerDirectorIndoor
Origin AcousticsD51DT$ 146.00$ 420.00Director Minimal Opening Series - 5.25" In-Ceiling Loudspeakers with 20mm black Teteron dome dual tweeter, neo magnet, 12dB crossover for tweeter and woofereach (ea)In-CeilingSpeakerDirectorIndoor
Origin AcousticsD53$ 113.00$ 328.00Director Minimal Opening Series - In-Ceiling Loudspeaker with aluminum dome Tweeter, 5" Glass Fiber Woofer, and Tool-Less Installation.each (ea)In-CeilingSpeakerDirectorIndoor
Origin AcousticsD53DT$ 178.00$ 511.00Director Minimal Opening Series - In-Ceiling Loudspeaker with dual Tweeters, 5" Glass Fiber Woofer, and Tool-Less Installation.each (ea)In-CeilingSpeakerDirectorIndoor
Origin AcousticsD55$ 146.00$ 420.00Director Minimal Opening Series - In-Ceiling Loudspeaker with DPSD dome Tweeter, 5" Glass Fiber Woofer, and Tool-Less Installation.each (ea)In-CeilingSpeakerDirectorIndoor
Origin AcousticsD55EX$ 178.00$ 511.00Explorer Series - Fully Pivoting 2-Way In-Ceiling Loudspeaker with 5.25" Woofer, Aluminum Tweeter, Extended Weather Protection, and Tool-Less Installation.each (ea)In-CeilingSpeakerDirectorMarine
Origin AcousticsD57$ 178.00$ 511.00Director Minimal Opening Series - In-Ceiling Loudspeaker with Silk DPSD Tweeter, 5" Glass Fiber Woofer, and Tool-Less Installation.each (ea)In-CeilingSpeakerDirectorIndoor
Origin AcousticsD57DT/SUR$ 215.00$ 619.00Director Minimal Opening Series - In-Ceiling Loudspeaker with Silk DPSD Tweeter, 5" Glass Fiber Woofer, and Tool-Less Installation.each (ea)In-CeilingSpeakerDirectorIndoor
Origin AcousticsD59$ 237.00$ 683.00Director Minimal Opening Series - In-Ceiling Loudspeaker with Silk DPSD Tweeter, 5" Kevlar Woofer, and Tool-Less Installation.each (ea)In-CeilingSpeakerDirectorIndoor
Origin AcousticsD61DT$ 146.00$ 420.00Director 6" Series - 2-Way In-Ceiling Loudspeaker with a 6.5" Poly-Rubber Woofer, Dual silk dome tweeters and Tool-Less Installation.each (ea)In-CeilingSpeakerDirectorIndoor
Origin AcousticsD63$ 113.00$ 328.00Director 6" Series - 2-Way In-Ceiling Loudspeaker with a 6.5" IMG Woofer, Pivoting Aluminum Tweeter and Tool-Less Installation.each (ea)In-CeilingSpeakerDirectorIndoor
Origin AcousticsD63DT/SUR$ 178.00$ 511.00Director 6" Series - Stereo In-Ceiling Loudspeaker with a 6.5" IMG Woofer, Dual Aluminum Tweeters and Tool-Less Installation.each (ea)In-CeilingSpeakerDirectorIndoor
Origin AcousticsD65$ 146.00$ 420.00Director 6" Series - Fully Pivoting 2-Way In-Ceiling Loudspeaker with a 6.5" IMG Woofer, Exclusive DPSD tweeter Technology and Tool-less Installation.each (ea)In-CeilingSpeakerDirectorIndoor
Origin AcousticsD65EX$ 178.00$ 511.00Explorer Series - Fully Pivoting 2-Way In-Ceiling Loudspeaker with 6.5" IMG Woofer, Aluminum Tweeter, Extended Weather Protection, and Tool-Less Installation.each (ea)In-CeilingSpeakerDirectorMarine
Origin AcousticsD67$ 178.00$ 511.00Director 6" Series - Fully Pivoting 2-Way In-Ceiling Loudspeaker with a 6.5" Glass Fiber Woofer, Exclusive DPSD tweeter Technology and Tool-less Installation.each (ea)In-CeilingSpeakerDirectorIndoor
Origin AcousticsD69$ 301.00$ 855.00Director 6" Series - Fully Pivoting 2-Way In-Ceiling Loudspeaker with a 6.5" Kevlar Woofer, Exclusive DPSD tweeter Technology and Tool-less Installation.each (ea)In-CeilingSpeakerDirectorIndoor
Origin AcousticsD80DT$ 167.00$ 479.008" Series - In-Ceiling Loudspeaker with Silk dual Tweeters and 8" Poly-Rubber Woofer, Tool-Less Installation.each (ea)In-CeilingSpeakerDirectorIndoor
Origin AcousticsD83$ 167.00$ 484.00Director 8" Series - In-Ceiling Loudspeaker with an 8" IMG Woofer, Pivoting Aluminum Dome Tweeter and Tool-less Installation.each (ea)In-CeilingSpeakerDirectorIndoor
Origin AcousticsD83A$ 183.00$ 533.00Director 8" Series - In-Ceiling Loudspeaker with an 8" IMG Woofer, Pivoting Aluminum Dome Tweeter and Tool-less Installation.each (ea)In-CeilingSpeakerDirectorIndoor
Origin AcousticsD83AEX$ 221.00$ 635.00Explorer Series - 2-Way In-Ceiling Loudspeaker with Pre-Angled 8" IMG Woofer, Pivoting Aluminum Tweeter, Extended Weather Protection, and Tool-Less Installation.each (ea)In-CeilingSpeakerDirectorMarine
Origin AcousticsD83DT/SUR$ 264.00$ 753.00Director 8" Series - Stereo In-Ceiling Loudspeaker with an 8" IMG Woofer, Dual Aluminum Tweeters and Tool-less Installation.each (ea)In-CeilingSpeakerDirectorIndoor
Origin AcousticsD83DT/SUR EX$ 328.00$ 941.00Explorer Series - 2-Way In-Ceiling Loudspeaker with 8" IMG Woofer, Dual Aluminum Tweeters, Extended Weather Protection, and Tool-Less Installation.each (ea)In-CeilingSpeakerDirectorMarine
Origin AcousticsD83EX$ 210.00$ 602.00Explorer Series - 2-Way In-Ceiling Loudspeaker with 8" IMG Woofer, Pivoting Aluminum Tweeter, Extended Weather Protection, and Tool-Less Installation.each (ea)In-CeilingSpeakerDirectorMarine
Origin AcousticsD85$ 237.00$ 683.00Director 8" Series - Fully Pivoting 3-Way In-Ceiling Loudspeaker with an 8" IMG Woofer, Exclusive DPSD Tweeter Technology and Tool-less Installation.each (ea)In-CeilingSpeakerDirectorIndoor
Origin AcousticsD85EX$ 285.00$ 817.00Explorer Series - Fully Pivoting 3-Way In-Ceiling Loudspeaker with 8" IMG Woofer, Aluminum Tweeter, Extended Weather Protection, and Tool-Less Installation.each (ea)In-CeilingSpeakerDirectorMarine
Origin AcousticsD87$ 339.00$ 973.00Director 8" Series - Fully Pivoting 3-Way In-Ceiling Loudspeaker with an 8" Glass Fiber Woofer, Exclusive DPSD tweeter Technology and Tool-less Installation.each (ea)In-CeilingSpeakerDirectorIndoor
Origin AcousticsD89$ 576.00$ 1,694.00Director 8" Series - Fully Pivoting 3-Way In-Ceiling Loudspeaker with an 8" Kevlar Woofer, Exclusive DPSD tweeter Technology and Tool-less Installation.each (ea)In-CeilingSpeakerDirectorIndoor
Origin AcousticsDBA10EX$ 285.00$ 656.00Explorer 10" Series - Retrofit In-Ceiling Subwoofer with 10" Glass Fiber Woofer, Temperature Resistant Plastic, IP66-Rating, and Tool-less Installation System.each (ea)In-CeilingSubwooferDirectorMarine
Origin AcousticsDSP2-200$ 511.00$ 1,075.00DSP Amplifiers - DSP2-200 Amplifier with five preset EQs, 200W of power at 4-ohm per channel, half-rack with ears and 1U total height.each (ea)ElectronicsAmplifierFoundationIndoor
Origin AcousticsDSP3-150$ 753.00$ 1,516.00DSP Series - 8-Ohm 3-Channel Amplifier with 2 channels of 150w @4 Ohm Power and 1 with 300w @ 4 Ohm, 2U Design and Origin Environment Correction DSP.each (ea)ElectronicsAmplifierFoundationIndoor
Origin AcousticsDSP60.8$ 1,183.00$ 1,984.00Residential Amplifiereach (ea)ElectronicsAmplifierFoundationIndoor
Origin AcousticsLCR37$ 129.00$ 377.00Composer Theater Series - In-Wall LCR Loudspeaker with Exclusive Silk DPSD Tweeter, Dual 3.5" Glass Fiber Woofers, and Patented SpringLock Tool-less Mounting System.each (ea)In-WallSpeakerComposer LCRIndoor
Origin AcousticsLCR39$ 194.00$ 565.00Composer Theater Series - In-Wall LCR Loudspeaker with Exclusive Silk DPSD Tweeter, Dual 3.5" Kevlar Woofers, and Patented SpringLock Tool-less Mounting System.each (ea)In-WallSpeakerComposer LCRIndoor
Origin AcousticsLCR65$ 194.00$ 565.00Composer Theater Series - In-Wall LCR Loudspeaker with aluminum Tweeter, Dual 6.5" IMG Woofers, and Patented SpringLock Tool-less Mounting System.each (ea)In-WallSpeakerComposer LCRIndoor
Origin AcousticsLCR67$ 269.00$ 774.00Composer Theater Series - In-Wall LCR Loudspeaker with Exclusive Silk DPSD Tweeter, Dual 6.5 Glass Fiber Woofers, and Patented SpringLock Tool-less Mounting System.each (ea)In-WallSpeakerComposer LCRIndoor
Origin AcousticsLCR69$ 377.00$ 1,086.00Composer Theater Series - In-Wall LCR Loudspeaker with Exclusive Silk DPSD Tweeter, Dual 6.5" Kevlar Woofers, and Patented SpringLock Tool-less Mounting System.each (ea)In-WallSpeakerComposer LCRIndoor
AmbisonicLSR40$ 323.00$ 645.00Ambisonic Systems - Landscape Loudspeakereach (ea)LandscapeSpeakerSeasonsOutdoor
AmbisonicLSR60$ 484.00$ 968.00Ambisonic Systems - 75w Weather Resistant Ribbon Landscape Loudspeakereach (ea)LandscapeSpeakerSeasonsOutdoor
AmbisonicLSR80$ 592.00$ 1,183.00Ambisonic Systems LSR80 - 6" Weather Resistant Ribbon Landscape Loudspeakereach (ea)LandscapeSpeakerSeasonsOutdoor
Origin AcousticsM2500IC$ 968.00$ 2,580.00Marquee Collection - In-Ceiling 3-Way Loudspeaker.each (ea)In-CeilingSpeakerMarqueeIndoor
Origin AcousticsM3500IW$ 968.00$ 2,580.00Marquee Collection - 2 Way Surround Sound Loudspeakereach (ea)In-WallSpeakerMarqueeIndoor
Origin AcousticsM3500OW$ 1,774.00$ 4,139.00Marquee Collection - Surround Sound On-Wall Loudspeakereach (ea)On-WallSpeakerMarqueeIndoor
Origin AcousticsM5500OW$ 2,419.00$ 5,483.00Marquee Collection - 3-Way Theater LCR Loudspeakereach (ea)On-WallSpeakerMarqueeIndoor
Origin AcousticsMOS36BOX$ 511.00$ 1,290.00MOS36BOX Minimal In-ceiling Subwoofer: 1pc 6" woofer+ cabinet accessoryIn-CeilingSpeakerMOSIndoor
Origin AcousticsOSR65$ 162.00$ 377.00Seasons Collection - 6" Rock Style Loudspeaker with optional 70v tap settings.each (ea)RockSpeakerSeasonsOutdoor
Origin AcousticsOSR85$ 232.00$ 538.00Seasons Collection - 8" Rock Style Loudspeaker with optional 70v tap settings.each (ea)RockSpeakerSeasonsOutdoor
Origin AcousticsOSUB10$ 1,011.00$ 2,021.00Seasons Landscape Series - 10" Outdoor Subwoofer with Rugged Polycomposite Enclosure, Designed For In-Ground Installation (8-ohm or 70v Taps).each (ea)LandscapeSubwooferSeasonsOutdoor
Origin AcousticsOSUB12$ 1,376.00$ 2,747.00Seasons Landscape Series - 12" Outdoor Subwoofer with Rugged Polycomposite Enclosure, Designed For In-Ground Installation (8-ohm or 70v Taps).each (ea)LandscapeSubwooferSeasonsOutdoor
Origin ProPC50$ 242.00$ 484.00Professional PC50 5.25" In-Ceiling Loudspeaker (Black Round/Square Grille)Pair (pr)In-CeilingSpeakerProIndoor
Origin ProPC50-TB$ 248.00$ 495.00Professional PC50 5.25" In-Ceiling Speaker with Tile Bridge (Black Round/Square Grille)Pair (pr)In-CeilingSpeakerProIndoor
Origin ProPC60$ 301.00$ 602.00Professional 6.5" In-Ceiling Loudspeaker (Black Round/Square Grille)Pair (pr)In-CeilingSpeakerProIndoor
Origin ProPC60-TB$ 307.00$ 613.00Professional 6.5" In-Ceiling Speaker with Tile Bridge (Black Round/Square Grille)Pair (pr)In-CeilingSpeakerProIndoor
Origin ProPC60S$ 301.00$ 602.00Professional 6.5" In-Ceiling Loudspeaker Slim Version (Black Round/Square Grille)Pair (pr)In-CeilingSpeakerProIndoor
Origin ProPC60SB-TB$ 296.00$ 592.00PC60S 6.5" In-Ceiling Loudspeaker slim version (black) and PCTB80 Tile Bridgeeach (ea)In-CeilingSpeakerProIndoor
Origin ProPC80$ 447.00$ 893.00Professional 8" In-Ceiling Loudspeaker (Black Round/Square Grille)Pair (pr)In-CeilingSpeakerProIndoor
Origin ProPC80-TB$ 452.00$ 903.00Professional 8" In-Ceiling Speaker with Tile Bridge (Black Round/Square Grille)Pair (pr)In-CeilingSpeakerProIndoor
Origin ProPCSUB8$ 307.00$ 613.00Professional In-Ceiling Sub 80 8" IC Sub 8" metal can subwoofer (Black Round/Square Grille)each (ea)In-CeilingSpeakerProIndoor
Origin ProPCSUB8B-TB$ 301.00$ 602.00PCSUB8B- 1 PCTB80- 1each (ea)In-CeilingSpeakerProIndoor
Origin ProPP50$ 301.00$ 602.00Professional Pendant 5.25" LoudspeakerPair (pr)PendantSpeakerProIndoor
Origin AcousticsPP50$ 301.00$ 602.00Professional Pendant 5.25" LoudspeakerPair (pr)PendantSpeakerProfessionalIndoor
Origin ProPP60$ 366.00$ 731.00Professional Pendant 6.5" Pendant LoudspeakerPair (pr)PendantSpeakerProIndoor
Origin AcousticsPP60$ 366.00$ 731.00Professional Pendant 6.5" Pendant Loudspeakereach (ea)PendantSpeakerProfessionalIndoor
Origin ProPP80$ 538.00$ 1,075.00Professional Pendant 8" Pendant LoudspeakerPair (pr)PendantSpeakerProIndoor
Origin AcousticsPP80$ 538.00$ 1,075.00Professional Pendant 8" Pendant Loudspeakereach (ea)PendantSpeakerProfessionalIndoor
Origin ProPPSUB8$ 323.00$ 570.00Professional Pendant Sub 80, 8" Pendant Sub, Blackeach (ea)PendantSubwooferProIndoor
Origin AcousticsPPSUB8$ 323.00$ 570.00Professional Pendant Sub 80, 8" Pendant Subeach (ea)PendantSubwooferProfessionalIndoor
Origin ProProA1000.1$ 1,258.00$ 2,097.00Pro Amplifier ProA1000.1each (ea)ElectronicsAmplifierProIndoor
Origin ProProA1000.2$ 1,774.00$ 2,957.00Pro Amplifier ProA1000.2each (ea)ElectronicsAmplifierProIndoor
Origin ProProA1000.4$ 3,000.00$ 4,999.00Pro Amplifier ProA1000.4each (ea)ElectronicsAmplifierProIndoor
Origin ProProA1200.1$ 1,387.00$ 2,312.00Pro Amplifier ProA1200.1each (ea)ElectronicsAmplifierProIndoor
Origin ProProA1200.2$ 1,968.00$ 3,279.00Pro Amplifier ProA1200.2each (ea)ElectronicsAmplifierProIndoor
Origin ProProA1200.4$ 3,354.00$ 5,590.00Pro Amplifier ProA1200.4each (ea)ElectronicsAmplifierProIndoor
Origin ProProA125.1$ 549.00$ 914.00Pro Amplifier ProA125.1each (ea)ElectronicsAmplifierProIndoor
Origin ProProA125.2$ 774.00$ 1,290.00Pro Amplifier ProA125.2each (ea)ElectronicsAmplifierProIndoor
Origin ProProA125.4$ 1,323.00$ 2,204.00Pro Amplifier ProA125.4each (ea)ElectronicsAmplifierProIndoor
Origin ProProA250.1$ 742.00$ 1,237.00Pro Amplifier ProA250.1each (ea)ElectronicsAmplifierProIndoor
Origin ProProA250.2$ 1,065.00$ 1,774.00Pro Amplifier ProA250.2each (ea)ElectronicsAmplifierProIndoor
Origin ProProA250.4$ 1,839.00$ 3,064.00Pro Amplifier ProA250.4each (ea)ElectronicsAmplifierProIndoor
Origin ProPS50$ 291.00$ 581.00PS50 - 5.25" Surface Mount, pairPair (pr)Surface MountSpeakerProIndoor
Origin ProPS60$ 355.00$ 710.00Professional Surface 60, 6" Surface Mount, pair, BlackPair (pr)Surface MountSpeakerProIndoor
Origin ProPS80$ 527.00$ 1,054.00Professional Surface 80, 8" Surface Mount, pairsPair (pr)Surface MountSpeakerProIndoor
Origin AcousticsSBR41$ 189.00$ 471.00Soundbar Series - Soundbar Loudspeaker with 3.5" Glass Fiber Woofer and Silk DSPD Tweeter. 1-Channel to use as L, C or R.each (ea)SoundbarSpeakerComposerIndoor
Origin AcousticsSBR41-LCR$ 269.00$ 672.00Soundbar Series - Soundbar Loudspeaker with Dual 3.5" Glass Fiber Woofers and Silk DSPD Tweeter. 1-Channel to use as L, C or R.each (ea)SoundbarSpeakerComposerIndoor
Origin AcousticsSBR43-50$ 538.00$ 1,344.00Soundbar Series - Soundbar Loudspeaker with 3.5" Glass Fiber Woofers and Three Silk DPSD Tweeters (LCR).each (ea)SoundbarSpeakerComposerIndoor
Origin AcousticsSBR43-50C$ 538.00$ 1,210.00Soundbar Series - Soundbar Loudspeaker with 3.5" Glass Fiber Woofers and Silk DSPD Tweeters (1-center channel).each (ea)SoundbarSpeakerComposerIndoor
Origin AcousticsSBR43-60$ 645.00$ 1,613.00Soundbar Series - Soundbar LCR Loudspeaker with 3.5" Glass Fiber Woofers and Silk DSPD Tweeter.each (ea)SoundbarSpeakerComposerIndoor
Origin AcousticsSBR43-70$ 753.00$ 1,882.00Soundbar Series - Soundbar LCR Loudspeaker with 3.5" Glass Fiber Woofers and Silk DSPD Tweeter.each (ea)SoundbarSpeakerComposerIndoor
Origin AcousticsSBR43-80$ 860.00$ 2,150.00Soundbar Series - Soundbar LCR Loudspeaker with 3.5" Glass Fiber Woofers and Silk DSPD Tweeter.each (ea)SoundbarSpeakerComposerIndoor
Origin AcousticsSubA150$ 420.00$ 903.00Foundation Series - Subwoofer Amplifier with 150w of Class D Power in a 1U Design.each (ea)ElectronicsAmplifierFoundationIndoor
Origin AcousticsSubA500$ 807.00$ 1,742.00Foundation Series - Subwoofer Amplifier with 500w of Class D Power in a 1U Design.each (ea)ElectronicsAmplifierFoundationIndoor
Origin AcousticsSUBD10$ 635.00$ 1,278.00Deep Series - Subwoofer with 10" Composite Driver, 10" Passive Radiator. Mid-century Modern Design.each (ea)SubwooferSubwooferDeepIndoor
Origin AcousticsSUBD8$ 463.00$ 925.00Deep Series - Subwoofer with 8" Composite Driver, 8" Passive Radiator. Mid-century Modern Design.each (ea)SubwooferSubwooferDeepIndoor
Origin AcousticsSUBS10$ 807.00$ 1,774.00SUBS10 Slim Powered Subwoofereach (ea)SubwooferSubwooferSlimIndoor
Origin AcousticsSUBV10P$ 430.00$ 860.0010" Performance Subwoofer with Premium Line Grain Finish.each (ea)SubwooferSubwooferValueIndoor
Origin AcousticsSUBV12P$ 516.00$ 1,032.0012" Performance Subwoofer with Premium Line Grain Finish.each (ea)SubwooferSubwooferValueIndoor
Origin AcousticsSUBV8P$ 318.00$ 635.008" Performance Subwoofer with Premium Line Grain Finish.each (ea)SubwooferSubwooferValueIndoor
Origin AcousticsTF37DTEX$ 199.00$ 570.00ThinFit dual tweeter, high temperature plastic, metal grill with weather coatingeach (ea)In-CeilingSpeakerThinFitMarine
Origin AcousticsTF37EX$ 172.00$ 495.00Thinfit Explorer Series - Round Loudspeaker with and DPSD Dome Tweeter, Dual 3.5" Glass Fiber Woofers, Dual 3.5" Glass Fiber Mid-Woofers. High-temperature plastic. Treated metal grille.each (ea)In-CeilingSpeakerThinFitMarine
Origin AcousticsTFIW37EX$ 199.00$ 570.00Thinfit Collection - Thinfit In-Wall Loudspeaker. Silk DPSD Tweeter & Quad 3.5" Glass Fiber woofers. High temperature plastic and metal grill with Dacrometing coating.each (ea)In-WallSpeakerThinFitMarine
Origin AcousticsTHTR67$ 678.00$ 1,978.00Composer Theater Series - In-Wall THTR Loudspeaker with Exclusive Silk DPSD Tweeter, Quad 6.5" Glass Fiber Woofers, and the patented SpringLock Tool-less Mounting System.each (ea)In-WallSpeakerTheaterIndoor
Origin AcousticsTHTR69$ 807.00$ 2,322.00Composer Theater Series - In-Wall THTR Loudspeaker with Exclusive Silk DPSD Tweeter, Quad 6.5" Kevlar Woofers, and the patented SpringLock Tool-less Mounting System.each (ea)In-WallSpeakerTheaterIndoor
`;

// --- DATA PARSING LOGIC ---
const parseRawData = () => {
    const lines = RAW_TEXT_BLOCK.trim().split('\n');
    const parsed = [];

    const PRODUCTS = ['In-Wall', 'In-Ceiling', 'Landscape', 'Pendant', 'Surface Mount', 'Electronics', 'Soundbar', 'Line-Array', 'Invisible', 'On-Wall', 'Bollard', 'Rock', 'Acoustic Landscape'];
    const TYPES = ['Speaker', 'Subwoofer', 'Amplifier - DANTE', 'Amplifier', 'System Kit'];
    const COLLECTIONS = ['Composer', 'Director', 'Pro', 'Seasons', 'Foundation', 'HD', 'Marquee', 'MOS', 'Entertainer', 'Theater', 'ThinFit', 'BLENDS', 'Deep', 'Value', 'Slim', 'Professional', 'Pro'];
    const APPS = ['Indoor', 'Outdoor', 'Marine'];
    const UNITS = ['each (ea)', 'Pair (pr)', 'pack of 6 (6 pk)', '6 Pack (Box of 6)', '8 pack (Box of 8)', 'four pair (4 pr)', 'Box', 'Kit/Package'];

    const findAndRemove = (text, list) => {
        const sortedList = [...list].sort((a, b) => b.length - a.length);
        for (const item of sortedList) {
            if (text.includes(item)) {
                return { found: item, remaining: text.replace(item, '').trim() };
            }
        }
        return { found: 'Unknown', remaining: text };
    };

    lines.forEach(line => {
        if (!line.trim()) return;

        let brand = '';
        if (line.startsWith('Origin Acoustics')) brand = 'Origin Acoustics';
        else if (line.startsWith('Origin Pro')) brand = 'Origin Pro';
        else if (line.startsWith('Ambisonic')) brand = 'Ambisonic';

        const afterBrand = line.substring(brand.length);
        const priceRegex = /\$ ([0-9,]+\.[0-9]{2}).*?\$ ([0-9,]+\.[0-9]{2})/;
        const priceMatch = afterBrand.match(priceRegex);

        if (priceMatch) {
            const dealerStr = priceMatch[1].replace(/,/g, '');
            const msrpStr = priceMatch[2].replace(/,/g, '');
            const name = afterBrand.substring(0, priceMatch.index).trim();
            const tail = afterBrand.substring(priceMatch.index + priceMatch[0].length);

            let unit = '';
            let description = '';
            let metadata = '';

            for (const u of UNITS) {
                if (tail.includes(u)) {
                    unit = u;
                    const parts = tail.split(u);
                    description = parts[0].trim();
                    metadata = parts.slice(1).join(u).trim();
                    break;
                }
            }

            if (!unit) { metadata = tail; description = 'N/A'; }

            let currentMeta = metadata;
            const prodRes = findAndRemove(currentMeta, PRODUCTS);
            const product = prodRes.found;
            currentMeta = prodRes.remaining;

            const typeRes = findAndRemove(currentMeta, TYPES);
            let type = typeRes.found;
            currentMeta = typeRes.remaining;

            const collRes = findAndRemove(currentMeta, COLLECTIONS);
            const collection = collRes.found;
            currentMeta = collRes.remaining;

            const appRes = findAndRemove(currentMeta, APPS);
            const app = appRes.found;

            if (product === 'Unknown' || type === 'Unknown') {
                if (description.toLowerCase().includes('subwoofer')) {
                    type = 'Subwoofer';
                }
            }

            const isKit = type.includes('Kit') || unit.includes('Kit');
            const isPack = unit.toLowerCase().includes('pack');
            const isColorVariation =
                name.endsWith('-BK') ||
                name.endsWith('-WK') ||
                name.endsWith('-BL') ||
                name.endsWith('-CH') ||
                name.includes('Black') ||
                name.includes('White') ||
                description.includes('Color') ||
                (unit.includes('Black') || unit.includes('White'));

            if (
                (type.includes('Speaker') || type.includes('Subwoofer') || type.includes('Amplifier')) &&
                !isKit &&
                !isPack &&
                !isColorVariation &&
                !type.includes('DANTE')
            ) {
                parsed.push({ name, dealer: parseFloat(dealerStr), msrp: parseFloat(msrpStr), brand, description, unit, product, type, collection, app });
            }
        }
    });

    return parsed;
};

const ALL_DATA = parseRawData();

// --- GLASSMORPHIC COMPONENTS ---

const CursorLight = () => {
    const [pos, setPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div
            className="fixed w-[600px] h-[600px] rounded-full pointer-events-none opacity-20 blur-[100px] transition-transform duration-75 ease-out -z-10"
            style={{
                background: 'radial-gradient(circle, rgba(59,130,246,0.6) 0%, rgba(30,58,138,0.2) 50%, transparent 70%)',
                left: -300,
                top: -300,
                transform: `translate(${pos.x}px, ${pos.y}px)`
            }}
        />
    );
};

const GlassCard = ({ title, value, highlight, compact }) => (
    <div className={`relative overflow-hidden rounded-xl border transition-all duration-300 group
    ${highlight
            ? 'bg-primary/20 border-primary/50 shadow-[0_0_20px_rgba(59,130,246,0.2)]'
            : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 hover:shadow-lg backdrop-blur-md'}
    ${compact ? 'p-4' : 'p-6'} flex items-center justify-between`}>

        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

        <p className={`font-bold uppercase tracking-wider z-10 ${compact ? 'text-[10px]' : 'text-xs'} ${highlight ? 'text-primary/70' : 'text-slate-400'}`}>{title}</p>
        <h3 className={`font-bold z-10 ${compact ? 'text-2xl' : 'text-3xl'} ${highlight ? 'text-white' : 'text-slate-100'}`}>{value}</h3>
    </div>
);

const FilterButton = ({ label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`relative px-4 py-2 text-xs font-medium rounded-lg transition-all duration-300 border overflow-hidden
      ${isActive
                ? 'text-white border-primary shadow-[0_0_15px_rgba(59,130,246,0.4)]'
                : 'text-slate-400 border-white/10 hover:border-white/30 hover:text-white hover:bg-white/5'
            }`}
    >
        {isActive && (
            <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm -z-10" />
        )}
        <span className="relative z-10 font-mono uppercase tracking-tighter">{label}</span>
    </button>
);

const SectionTitle = ({ title }) => (
    <h2 className="text-sm font-bold text-white mb-6 flex items-center gap-3">
        <div className="w-1 h-5 bg-primary rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
        <span className="tracking-widest font-display">{title}</span>
    </h2>
);

const FixedBrandCard = () => (
    <div className="px-4 py-2">
        <h4 className="text-[10px] uppercase text-slate-500 font-bold tracking-wider mb-2 border-b border-white/10 pb-1">Brand Share</h4>
        <div className="space-y-1">
            <div className="flex justify-between items-center text-[11px] gap-6">
                <span className="text-slate-300 font-mono">Origin Acoustics</span>
                <span className="font-mono text-primary font-bold">90</span>
            </div>
            <div className="flex justify-between items-center text-[11px] gap-6">
                <span className="text-slate-300 font-mono">OriginPRO</span>
                <span className="font-mono text-primary font-bold">28</span>
            </div>
            <div className="flex justify-between items-center text-[11px] gap-6">
                <span className="text-slate-300 font-mono">Ambisonic</span>
                <span className="font-mono text-primary font-bold">35</span>
            </div>
            <div className="flex justify-between items-center text-[11px] pt-1 mt-1 border-t border-white/10 gap-6">
                <span className="text-white font-bold uppercase tracking-wider font-mono">Total SKUs</span>
                <span className="font-mono text-white font-bold">145</span>
            </div>
        </div>
    </div>
);

const SortHeader = ({ label, sortKey, currentSort, onSort, className }) => (
    <th
        className={`p-4 cursor-pointer hover:bg-white/5 transition-colors group ${className}`}
        onClick={() => onSort(sortKey)}
    >
        <div className="flex items-center gap-2">
            <span className="text-slate-300 font-bold text-xs uppercase tracking-wider font-display">{label}</span>
            <div className="flex flex-col text-slate-600 group-hover:text-primary transition-colors">
                <ChevronUp size={12} className={currentSort.key === sortKey && currentSort.direction === 'asc' ? 'text-primary opacity-100' : 'opacity-30'} />
                <ChevronDown size={12} className={currentSort.key === sortKey && currentSort.direction === 'desc' ? 'text-primary opacity-100' : 'opacity-30'} />
            </div>
        </div>
    </th>
);

export default function ProductPortfolio() {
    const [selectedBrand, setSelectedBrand] = useState('All');
    const [selectedCollection, setSelectedCollection] = useState('All');
    const [selectedProduct, setSelectedProduct] = useState('All');
    const [selectedType, setSelectedType] = useState('All');
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

    const brandOrder = ['All', 'Origin Acoustics', 'Origin Pro', 'Ambisonic'];

    useEffect(() => {
        if (selectedBrand === 'Origin Pro') {
            setSelectedCollection('All');
        }
    }, [selectedBrand]);

    const brands = useMemo(() => {
        const available = new Set(ALL_DATA.map(d => d.brand));
        return brandOrder.filter(b => b === 'All' || available.has(b));
    }, []);

    const collections = useMemo(() => {
        if (selectedBrand === 'Origin Pro') return ['All'];

        let data = ALL_DATA;
        if (selectedBrand !== 'All') data = data.filter(d => d.brand === selectedBrand);

        const allCols = new Set(data.map(d => d.collection));
        const validCols = [...allCols].filter(c => c !== 'Pro').sort();
        return ['All', ...validCols];
    }, [selectedBrand]);

    const products = useMemo(() => {
        let data = ALL_DATA;
        if (selectedBrand !== 'All') data = data.filter(d => d.brand === selectedBrand);
        if (selectedCollection !== 'All') data = data.filter(d => d.collection === selectedCollection);
        return ['All', ...new Set(data.map(d => d.product))].sort();
    }, [selectedBrand, selectedCollection]);

    const types = useMemo(() => {
        return ['All', 'Speaker', 'Subwoofer', 'Amplifier'];
    }, []);

    const filteredData = useMemo(() => {
        let data = ALL_DATA.filter(item => {
            const matchBrand = selectedBrand === 'All' || item.brand === selectedBrand;
            const matchColl = selectedCollection === 'All' || item.collection === selectedCollection;
            const matchProd = selectedProduct === 'All' || item.product === selectedProduct;
            const matchType = selectedType === 'All' || item.type.includes(selectedType);
            return matchBrand && matchColl && matchProd && matchType;
        });

        if (sortConfig.key) {
            data.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
                if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return data;
    }, [selectedBrand, selectedCollection, selectedProduct, selectedType, sortConfig]);

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const metrics = useMemo(() => {
        if (filteredData.length === 0) return { totalItems: 0, speakerCount: 0, subCount: 0, ampCount: 0 };

        const speakerCount = filteredData.filter(i => i.type.includes('Speaker')).length;
        const subCount = filteredData.filter(i => i.type.includes('Subwoofer')).length;
        const ampCount = filteredData.filter(i => i.type.includes('Amplifier')).length;

        return { totalItems: filteredData.length, speakerCount, subCount, ampCount };
    }, [filteredData]);

    const productTypeData = useMemo(() => {
        const counts = {};
        filteredData.forEach(item => { counts[item.product] = (counts[item.product] || 0) + 1; });
        return Object.keys(counts)
            .map(key => ({ name: key, value: counts[key] }))
            .sort((a, b) => b.value - a.value);
    }, [filteredData]);

    const FilterSection = ({ title, options, selected, onSelect, className }) => (
        <div className={`flex flex-col gap-3 ${className}`}>
            <span className="text-[10px] uppercase text-slate-500 font-bold tracking-wider ml-1 font-display">{title}</span>
            <div className="flex flex-wrap gap-2">
                {options.map(opt => (
                    <FilterButton
                        key={opt}
                        label={opt}
                        isActive={selected === opt}
                        onClick={() => onSelect(opt)}
                    />
                ))}
            </div>
        </div>
    );

    const summaryStats = useMemo(() => {
        const uniqueCollections = new Set(ALL_DATA.map(d => d.collection)).size;
        const uniqueCategories = new Set(ALL_DATA.map(d => d.product)).size;
        const uniqueTypes = new Set(ALL_DATA.map(d => d.type)).size;
        return { uniqueCollections, uniqueCategories, uniqueTypes };
    }, []);

    return (
        <div className="w-full text-slate-200 font-mono selection:bg-primary/30 selection:text-white relative z-10 pb-20">
            <CursorLight />

            {/* 1. Portfolio Header */}
            <div className="mb-12">
                <h1 className="text-3xl font-bold text-white tracking-tight drop-shadow-md font-display uppercase">OA PRODUCT PORTFOLIO</h1>
                <div className="text-[11px] text-slate-400 mt-2 font-light max-w-xl leading-relaxed uppercase tracking-widest">
                    *Filtered database of core audio assets.<br />
                    <strong className="text-primary font-bold block mt-1 tracking-tight">System validation: Speakers, Subwoofers, Amplifiers only.</strong>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
                <div className="lg:col-span-3 space-y-8">
                    <SectionTitle title="SYSTEM PARAMETERS" />
                    <div className="space-y-6 bg-white/[0.02] p-6 rounded-none border border-white/5 backdrop-blur-3xl shadow-2xl">
                        <FilterSection title="BRAND ENTITY" options={brands} selected={selectedBrand} onSelect={setSelectedBrand} />
                        <FilterSection title="ASSET COLLECTION" options={collections} selected={selectedCollection} onSelect={setSelectedCollection} />
                        <FilterSection title="CLASSIFICATION" options={products} selected={selectedProduct} onSelect={setSelectedProduct} />
                        <div className="pt-4 border-t border-white/5">
                            <FilterSection title="ASSET TYPE" options={types} selected={selectedType} onSelect={setSelectedType} />
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <SectionTitle title="GLOBAL METRICS" />
                    <div className="space-y-4">
                        <div className="p-4 border border-white/5 bg-white/[0.03] backdrop-blur-md">
                            <FixedBrandCard />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <GlassCard title="Speakers" value={metrics.speakerCount} compact />
                            <GlassCard title="Subs" value={metrics.subCount} compact />
                            <GlassCard title="Amps" value={metrics.ampCount} compact />
                            <GlassCard title="Active" value={metrics.totalItems} highlight compact />
                        </div>
                    </div>
                </div>
            </div>

            <SectionTitle title="PORTFOLIO BREAKDOWN" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-12">
                {productTypeData.map((item) => (
                    <div key={item.name} className="group relative overflow-hidden rounded-none border border-white/5 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/10 transition-all p-3 flex items-center justify-between backdrop-blur-sm">
                        <div className="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        <p className="relative z-10 text-[9px] uppercase text-primary/80 font-black tracking-tighter truncate mr-2">{item.name}</p>
                        <span className="relative z-10 text-xl font-bold text-white">{item.value}</span>
                    </div>
                ))}
            </div>

            <SectionTitle title="ASSET REPOSITORY" />
            <div className="rounded-none border border-white/5 overflow-hidden backdrop-blur-3xl bg-black/40 shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-[11px] text-slate-300 uppercase tracking-tighter">
                        <thead className="bg-white/5 border-b border-white/5">
                            <tr>
                                <th className="p-4 w-[5%] text-center text-slate-600 font-bold">#</th>
                                <SortHeader label="ENTITY / COLLECTION" sortKey="brand" currentSort={sortConfig} onSort={handleSort} className="w-[15%]" />
                                <SortHeader label="CATEGORY / TYPE" sortKey="product" currentSort={sortConfig} onSort={handleSort} className="w-[15%]" />
                                <SortHeader label="IDENTIFIER" sortKey="name" currentSort={sortConfig} onSort={handleSort} className="w-[20%]" />
                                <SortHeader label="SPECIFICATIONS" sortKey="description" currentSort={sortConfig} onSort={handleSort} className="w-[35%]" />
                                <SortHeader label="VALUATION" sortKey="msrp" currentSort={sortConfig} onSort={handleSort} className="w-[10%] text-right" />
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredData.map((item, idx) => (
                                <tr key={idx} className="hover:bg-white/5 transition-colors group">
                                    <td className="p-4 text-center text-slate-700 font-bold group-hover:text-primary transition-colors">{idx + 1}</td>
                                    <td className="p-4">
                                        <div className="text-slate-100 font-bold">{item.brand}</div>
                                        <div className="text-[9px] text-slate-600 mt-0.5 font-bold tracking-widest">{item.collection}</div>
                                    </td>
                                    <td className="p-4">
                                        <div className="text-slate-400">{item.product}</div>
                                        <div className="text-[9px] text-slate-600 mt-0.5">{item.type}</div>
                                    </td>
                                    <td className="p-4 font-bold text-primary group-hover:text-primary/70 transition-colors">{item.name}</td>
                                    <td className="p-4 text-slate-600 group-hover:text-slate-400 leading-tight transition-colors">{item.description}</td>
                                    <td className="p-4 text-right font-bold text-slate-200 group-hover:text-white transition-colors">
                                        {item.msrp > 0 ? `$${item.msrp.toLocaleString()}` : '-'}
                                    </td>
                                </tr>
                            ))}
                            {filteredData.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="p-12 text-center text-slate-500 italic">SYSTEM STATUS: NULL SET // NO MATCHES FOUND</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
