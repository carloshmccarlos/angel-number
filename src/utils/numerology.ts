// Pythagorean numerology mapping
const PYTHAGOREAN_MAP: Record<string, number> = {
  A: 1, J: 1, S: 1,
  B: 2, K: 2, T: 2,
  C: 3, L: 3, U: 3,
  D: 4, M: 4, V: 4,
  E: 5, N: 5, W: 5,
  F: 6, O: 6, X: 6,
  G: 7, P: 7, Y: 7,
  H: 8, Q: 8, Z: 8,
  I: 9, R: 9,
}

export interface AngelDetail {
  theme: string
  description: string
  love: string
  career: string
  growth: string
  wealth: string
}

// Master details mapped by exact number string
export const ANGEL_DETAILS: Record<string, AngelDetail> = {
  '111': {
    theme: 'New Beginnings',
    description: '111 carries the energy of initiative and fresh starts. It symbolizes the power of thoughts manifesting into reality, urging you to focus your intentions with clarity.',
    love: 'A new chapter in your relationships is opening. Stay open to unexpected connections and trust the pull of genuine alignment.',
    career: 'You are at the threshold of a new professional direction. Your instincts point toward something original — trust them.',
    growth: 'This is your cue to start the practice, the project, or the pursuit you have been circling. The moment is now.',
    wealth: 'Abundance starts with belief. The symbolic pattern of 111 invites you to examine the thoughts you carry around prosperity.',
  },
  '222': {
    theme: 'Balance & Trust',
    description: '222 is the symbol of harmony and patience. It reflects the numerological principle that lasting growth emerges from steady, balanced effort rather than urgency.',
    love: 'Your relationships are in a phase of deepening. Focus on listening as much as speaking — balance is the foundation here.',
    career: 'Collaboration and cooperation are highlighted. The most meaningful progress may come through partnership rather than solo effort.',
    growth: 'Trust the timing of your development. What you have been nurturing quietly is closer to bloom than it appears.',
    wealth: 'Financial clarity may come through steadiness and planning. Reflect on whether your resources are in balance with your values.',
  },
  '333': {
    theme: 'Growth & Guidance',
    description: '333 resonates with creative expansion and expressive energy. In numerology, three represents synthesis — the meeting point of mind, body, and spirit.',
    love: 'Joy and playful connection are highlighted. Authentic expression strengthens the bonds that matter most to you.',
    career: 'Creative endeavors and communication-forward roles are favored. Express your unique perspective without hesitation.',
    growth: 'Your creativity is a form of intelligence. Channel it into the areas where you seek to expand most.',
    wealth: 'Abundance may flow through your creative gifts. Reflect on how your talents could be shared more generously.',
  },
  '444': {
    theme: 'Stability & Strength',
    description: '444 represents the solid architecture of effort. It carries the numerological energy of structure, discipline, and the quiet power of sustained commitment.',
    love: 'Reliability and consistency are the love language highlighted here. Building trust through presence creates lasting bonds.',
    career: 'Foundations built with integrity will carry you far. This is a time for methodical progress over dramatic leaps.',
    growth: 'Your discipline is your greatest asset. The practices and habits you maintain now shape the person you are becoming.',
    wealth: 'Financial strength comes from steady stewardship. Reflect on what structures and systems support your long-term security.',
  },
  '555': {
    theme: 'Change & Transformation',
    description: '555 marks a significant shift in your numerological landscape. It embodies the dynamic energy of transformation — a call to embrace change rather than resist it.',
    love: 'Relationships may be evolving in unexpected ways. Stay flexible and curious rather than clinging to fixed expectations.',
    career: 'A transition or pivot may be presenting itself. Consider whether the path ahead requires a different kind of courage.',
    growth: 'Change is your teacher right now. The discomfort of transformation is often the exact shape of growth.',
    wealth: 'Financial shifts may prompt a rethinking of your approach to resources. Adaptability opens new possibilities.',
  },
  '666': {
    theme: 'Balance & Reflection',
    description: '666 in traditional numerology speaks to harmony, responsibility, and the balance between the material and the meaningful. It is an invitation to realign.',
    love: 'Care for others is your strength, but this pattern asks whether you are also caring for yourself with equal tenderness.',
    career: 'Purpose-driven work is highlighted. Reflect on whether what you do feels aligned with what you value most.',
    growth: 'This is a moment for honest self-reflection. What areas of your life have drifted from your core values?',
    wealth: 'The relationship between resources and responsibility is in focus. What does true abundance mean to you beyond numbers?',
  },
  '777': {
    theme: 'Spiritual Growth',
    description: '777 is perhaps the most introspective of all vibrations. It reflects the numerological tradition of seven as the number of inner wisdom, depth, and contemplative knowing.',
    love: 'Deep, meaningful connection is what your heart seeks. Prioritize quality over quantity in your relationships.',
    career: 'Work that engages your intellect and depth of character will be most fulfilling. Trust your analytical insight.',
    growth: 'Solitude and reflection are not isolation — they are where your deepest knowing emerges. Honor this inward season.',
    wealth: 'True wealth, in this context, is measured in insight and wisdom. What have you learned that no one can take away?',
  },
  '888': {
    theme: 'Abundance',
    description: '888 carries the cyclical energy of abundance and flow. In numerology, eight represents the infinite loop — the principle that what we give returns to us in kind.',
    love: 'Generosity and reciprocity define the healthiest connections. Reflect on where giving and receiving feel balanced.',
    career: 'Leadership and material achievement are highlighted. Your capacity to create and build is significant right now.',
    growth: 'Abundance is a mindset before it is a circumstance. What beliefs about sufficiency are you holding onto?',
    wealth: 'Financial flow is a central theme. Reflect on how you manage, share, and invest the resources that come to you.',
  },
  '999': {
    theme: 'Completion',
    description: '999 marks the end of a cycle in the numerological sequence. It carries the energy of culmination, release, and the wisdom earned through a completed chapter.',
    love: 'Old patterns in love may be completing. Release what no longer serves so that space opens for what truly fits.',
    career: 'A professional chapter may be reaching its natural conclusion. What have you mastered, and what is the next horizon?',
    growth: 'Completion is a form of courage. Letting go of what is finished is how you make room for what is becoming.',
    wealth: 'This pattern invites a reckoning with your relationship to material security. What are you ready to release or reinvest?',
  },
  '1111': {
    theme: 'Manifestation',
    description: '1111 is a master vibration — one of the most symbolically potent patterns in numerology. It reflects the amplified energy of aligned intention and the power of conscious creation.',
    love: 'Your capacity for deep, intentional connection is extraordinary. The relationships you nurture now carry significant resonance.',
    career: 'You are being called toward work that has meaning beyond the transactional. Vision-led paths are your natural territory.',
    growth: 'Your thoughts are powerful architects. What you focus on with sustained attention has unusual creative force in your life.',
    wealth: 'Manifestation is not magic — it is sustained, aligned action. Reflect on what you are consistently cultivating.',
  },
  '2222': {
    theme: 'Creation',
    description: '2222 carries the energy of the master builder. In numerology, this vibration represents the rare capacity to translate expansive vision into tangible, lasting structures.',
    love: 'You have the ability to create relationships of remarkable depth and durability. Invest in the bonds worth building.',
    career: 'Large-scale endeavors are where your energy finds its truest expression. Think in terms of legacy, not just outcome.',
    growth: 'You are capable of more than you allow yourself to imagine. The structures you build in this season may outlast the moment.',
    wealth: 'Material creation follows from visionary discipline. Reflect on what you are in the process of methodically constructing.',
  },
  '3333': {
    theme: 'Healing',
    description: '3333 resonates with the highest expression of compassionate service. This master vibration reflects the numerological archetype of the healer — one whose creative gifts are offered in service of others.',
    love: 'Your capacity for empathy and unconditional presence is a profound gift to the people in your life.',
    career: 'Work that contributes to the wellbeing of others carries unusual significance for you. Teaching, healing, and creative service are natural territories.',
    growth: 'Your growth is inseparable from your connection to others. The wisdom you carry is meant to be shared.',
    wealth: 'True richness, in your numerological context, is measured in impact and meaning as much as in material form.',
  },
  '4444': {
    theme: 'Manifested Foundations',
    description: '4444 is an amplified frequency of stability and structured support, inviting you to build legacy-level endeavors with steady assurance.',
    love: 'Focus on establishing absolute stability in your relationships. Mutual reliability is your path forward.',
    career: 'An exceptional time to construct long-term systems. Your meticulous engineering will bear substantial fruit.',
    growth: 'Your discipline is magnified. Ground yourself in structured routines that reinforce your mental resilience.',
    wealth: 'Long-term investments and structural assets are favored. Seek security over speculative ventures.',
  },
  '5555': {
    theme: 'Quantum Transformation',
    description: '5555 is an amplified vibration of rapid change and personal freedom, prompting you to stay adaptable and open to sudden evolutionary shifts.',
    love: 'Be ready for dynamic changes or pivots in your connection patterns. Embrace the freedom to evolve together.',
    career: 'A sudden career transition or high-velocity pivot may present itself. Trust your adaptability.',
    growth: 'Break free from stagnant patterns. The discomfort of transformation is the catalyst for your personal expansion.',
    wealth: 'Explore original, non-traditional income avenues. Flexibility with resources is key.',
  },
  '6666': {
    theme: 'Material Alignment',
    description: '6666 represents the harmony of service, responsibility, and the alignment between your material lifestyle and spiritual values.',
    love: 'Nurture your home base. Balanced empathy and mutual care are paramount for relationship alignment.',
    career: 'Purpose-driven vocations are highly favored. Ensure your daily work reflects your true ethical compass.',
    growth: 'Realign your personal energy. Balance your external output with quiet inward contemplation and self-nurture.',
    wealth: 'Use resources responsibly. Focus on establishing peace of mind over purely material accumulation.',
  },
  '7777': {
    theme: 'Mystical Mastery',
    description: '7777 is an amplified wave of spiritual introspection, deep analytical wisdom, and intuitive synthesis.',
    love: 'Seek deep soul connections. Surface-level interactions will not satisfy your current vibrational needs.',
    career: 'Research, advanced analysis, and contemplation are favored. Trust your specialized insights.',
    growth: 'Solitude and deep self-inquiry are your primary teachers now. Quiet the mind to hear your inner voice.',
    wealth: 'Reflect on the non-material treasures you possess. Spiritual assets are your primary guidance system.',
  },
  '8888': {
    theme: 'Infinite Abundance',
    description: '8888 represents the flow of cosmic harvest, reflecting the infinite loops of giving, receiving, and material manifestation.',
    love: 'A cycle of balance and reciprocity in love. Generosity returns to you amplified.',
    career: 'Your leadership and creation skills are operating at peak capacity. Build with bold, ethical ambition.',
    growth: 'Acknowledge the infinite flow of resources. Work through any lingering scarcity mindsets.',
    wealth: 'Excellent cycle for financial flow. Invest your resources back into meaningful and productive cycles.',
  },
  '9999': {
    theme: 'Grand Culmination',
    description: '9999 represents a massive transition of closure and release, marking a grand culmination and graduation in your life path.',
    love: 'Release expired relationship dynamics. Make room for connections that fit your modern vibration.',
    career: 'A major project or career chapter is closing. Celebrate your mastery and look toward the next horizon.',
    growth: 'Letting go is your greatest act of courage. Graduation requires stepping away from the familiar.',
    wealth: 'Reassess your material dependencies. Shift assets out of outdated projects and into future cycles.',
  },
  '000': {
    theme: 'Infinite Potential',
    description: '000 represents the absolute void and cosmic origin. It is the symbol of unlimited potential, fresh beginnings, and unity with the divine source.',
    love: 'Clean slates and fresh start opportunities are highlighted. Approach connections without past baggage.',
    career: 'An open space of infinite choice. You can construct whatever path you choose from the ground up.',
    growth: 'Meditate on the void. The absence of limits is both a freedom and an invitation to manifest anew.',
    wealth: 'A blank canvas financially. Focus on resetting your relationship with resources from a zero-point.',
  },
  '1010': {
    theme: 'Spiritual Awakening',
    description: '1010 represents a major gateway of progress, inviting you to align your thoughts with action and move forward with clarity.',
    love: 'A transition point in your love life. Focus on alignment of vision and mutual progress.',
    career: 'Step into roles of independent leadership. New paths open when you assert your unique capabilities.',
    growth: 'A period of awakening and clarity. Align your daily habits with your high-level spiritual goals.',
    wealth: 'Manifestation is close. Focus on purposeful decisions regarding your long-term security.',
  },
  '1212': {
    theme: 'Aligned Manifestation',
    description: '1212 is a harmonic sequence of trust, union, and action, encouraging you to move toward your goals with a balanced heart.',
    love: 'Harmony and union are highlighted. Trust the bond of partnership to help you grow.',
    career: 'Collaboration combined with individual initiative yields great results. Partner with aligned minds.',
    growth: 'Keep your thoughts positive and active. The balance between trust and effort is your focus.',
    wealth: 'Balanced stewardship. Opportunities come when you remain open to cooperative ventures.',
  },
  '1234': {
    theme: 'Progressive Steps',
    description: '1234 represents order, progress, and steady ascent, reminding you that great journeys are completed one step at a time.',
    love: 'Build your relationship systematically. Little daily habits of care form the foundation of love.',
    career: 'Methodical progress is highly favored. Do not skip steps; value the learning curve of your craft.',
    growth: 'Each day is a single step on your path. Focus on consistent, small improvements.',
    wealth: 'Financial security is built layer by layer. Trust the compounding value of regular planning.',
  },
  '123': {
    theme: 'Ascending Steps',
    description: '123 is a simple ascending sequence representing structured progress, indicating that you are moving in the right direction.',
    love: 'Your relationships are progressing naturally. Take small, deliberate steps to deepen trust.',
    career: 'Start from basic foundations. Orderly steps lead to long-term professional accomplishments.',
    growth: 'Simplify your development. Focus on basic, sequential habits that form the building blocks of mastery.',
    wealth: 'A stable progression. Methodical budgeting and saving are highly favored now.',
  },
  '234': {
    theme: 'Guided Progress',
    description: '234 reminds you that your efforts are supported by structural alignment, prompting you to keep taking methodical steps.',
    love: 'Trust the natural evolution of partnership. Support your partner in their own steps of growth.',
    career: 'Your career projects are scaling step-by-step. Focus on collaborative and structured growth.',
    growth: 'You are guided along your evolutionary path. Keep taking consistent, small, daily actions.',
    wealth: 'Financial projects are moving in a positive sequence. Maintain steady budget controls.',
  },
  '345': {
    theme: 'Creative Transition',
    description: '345 marks a sequential flow from stability to change, indicating that your structures are expanding creatively.',
    love: 'Prepare to adapt your joint structures. Creative changes bring fresh vitality to relationships.',
    career: 'A pivot is likely. Use your established skills to navigate a transition toward creative avenues.',
    growth: 'Your inner structures are expanding. Let go of rigid rules and allow your consciousness to grow.',
    wealth: 'Dynamic shifts in assets. Reinvest in modern platforms that offer greater flexibility.',
  },
  '1221': {
    theme: 'Reflective Harmony',
    description: '1221 is a mirrored sequence asking you to reflect on reciprocity and trust in your partnerships.',
    love: 'Bonds are strengthened when there is equal give-and-take. Ensure your partnerships are in perfect balance.',
    career: 'Focus on cooperative ventures where mutual benefits are explicitly structured and respected.',
    growth: 'Reflect on how you relate to others. Inner alignment reflects outward in harmonious relations.',
    wealth: 'Seek balanced agreements. Avoid high-risk contracts that do not offer equal terms.',
  },
  '1001': {
    theme: 'Fresh Awakening',
    description: '1001 represents a fresh start anchored in spiritual potential, urging you to trust new paths and personal independence.',
    love: 'A fresh perspective in relationships. Look for ways to bring independent growth into union.',
    career: 'Trust your unique leadership ideas. Start fresh cycles with clean confidence.',
    growth: 'A period of spiritual awakening. Explore original avenues of self-exploration and meditation.',
    wealth: 'Financial resets. Explore original concepts for creating resources on your own terms.',
  },
  '1331': {
    theme: 'Creative Abundance',
    description: '1331 represents a return to inner strength through creative synthesis, merging growth and power.',
    love: 'Let your authentic self lead in relationships. Expressive depth creates strong magnetic connections.',
    career: 'Combine creative design with organizational authority. Lead project cycles with confidence.',
    growth: 'A synthesis of self-worth and wisdom. Your creative path is your greatest asset.',
    wealth: 'Invest in your own creative talents. Self-expression is the foundation of your abundance.',
  },
}

// Maps vibration key to number string
export const ANGEL_MAP: Record<number, string> = {
  1: '111',
  2: '222',
  3: '333',
  4: '444',
  5: '555',
  6: '666',
  7: '777',
  8: '888',
  9: '999',
  11: '1111',
  22: '2222',
  33: '3333',
}

export type FocusArea = 'general' | 'love' | 'career' | 'growth' | 'wealth'

export interface NumerologyResult {
  nameNumber: number
  lifePathNumber: number
  personalVibration: number
  angelNumber: string
  theme: string
  description: string
  focusReading: string
  nameSteps: { letter: string; value: number }[]
  lifePathSteps: { label: string; value: number; reduced: number }[]
}

// Reduce to single digit only (no master number preservation)
function reduceToSingle(n: number): number {
  while (n > 9) {
    n = String(n).split('').reduce((sum, d) => sum + Number(d), 0)
  }
  return n
}

// Reduce a number to single digit, preserving master numbers 11, 22, 33
function reduceMaster(n: number): number {
  if (n === 11 || n === 22 || n === 33) return n
  while (n > 9) {
    n = String(n).split('').reduce((sum, d) => sum + Number(d), 0)
    if (n === 11 || n === 22 || n === 33) return n
  }
  return n
}

// Dynamically construct properties for any arbitrary numeric angel number string
export function getAngelDetail(number: string): AngelDetail {
  if (ANGEL_DETAILS[number]) {
    return ANGEL_DETAILS[number]
  }

  // Calculate sum of digits
  const sum = number.replace(/[^0-9]/g, '').split('').reduce((acc, d) => acc + Number(d), 0)
  const vibration = reduceMaster(sum)
  const baseKey = ANGEL_MAP[vibration] || '111'
  const baseDetail = ANGEL_DETAILS[baseKey]

  return {
    theme: `${baseDetail.theme} Resonance (Vibration ${vibration})`,
    description: `The sequence ${number} vibrates at the frequency of ${vibration}, aligning directly with the themes of ${baseDetail.theme.toLowerCase()} and active reflection.`,
    love: baseDetail.love,
    career: baseDetail.career,
    growth: baseDetail.growth,
    wealth: baseDetail.wealth,
  }
}

// Normalize name: uppercase, remove non-alpha, normalize accents
function normalizeName(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // strip diacritics
    .toUpperCase()
    .replace(/[^A-Z]/g, '') // keep only letters
}

export function calculateNameNumber(name: string): { number: number; steps: { letter: string; value: number }[] } {
  const cleaned = normalizeName(name)
  const steps = cleaned.split('').map(letter => ({
    letter,
    value: PYTHAGOREAN_MAP[letter] ?? 0,
  }))
  const total = steps.reduce((sum, s) => sum + s.value, 0)
  return { number: reduceToSingle(total), steps }
}

export function calculateLifePath(month: number, day: number, year: number): {
  number: number
  steps: { label: string; value: number; reduced: number }[]
} {
  const mReduced = reduceMaster(month)
  const dReduced = reduceMaster(day)
  const yearDigits = String(year).split('').reduce((sum, d) => sum + Number(d), 0)
  const yReduced = reduceMaster(yearDigits)

  const steps = [
    { label: 'Month', value: month, reduced: mReduced },
    { label: 'Day', value: day, reduced: dReduced },
    { label: 'Year', value: year, reduced: yReduced },
  ]

  const total = mReduced + dReduced + yReduced
  const finalNumber = reduceMaster(total)
  return { number: finalNumber, steps }
}

export function calculateResult(
  name: string,
  month: number,
  day: number,
  year: number,
  focus: FocusArea = 'general',
): NumerologyResult {
  const nameCalc = calculateNameNumber(name)
  const lifePathCalc = calculateLifePath(month, day, year)

  const rawVibration = nameCalc.number + lifePathCalc.number
  const personalVibration = reduceMaster(rawVibration)

  const angelNumStr = ANGEL_MAP[personalVibration] || '111'
  const mapping = getAngelDetail(angelNumStr)

  const focusReadingMap: Record<FocusArea, string> = {
    general: mapping.description,
    love: mapping.love,
    career: mapping.career,
    growth: mapping.growth,
    wealth: mapping.wealth,
  }

  return {
    nameNumber: nameCalc.number,
    lifePathNumber: lifePathCalc.number,
    personalVibration,
    angelNumber: angelNumStr,
    theme: mapping.theme,
    description: mapping.description,
    focusReading: focusReadingMap[focus],
    nameSteps: nameCalc.steps,
    lifePathSteps: lifePathCalc.steps,
  }
}
