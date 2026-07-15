# Angel Number Calculator - Product Requirements Document (PRD)

## 1. Product Information
* **Product Name**: Angel Number Calculator (天使数字计算器)
* **Product Type**: SEO-driven Interactive Web Application
* **Category**: Lifestyle Tool, Numerology Experience, Personal Reflection Platform
* **Target Market**:
  * **Phase 1**: English Market (US, UK, CA, AU)
  * **Phase 2**: Hindi, Spanish, Portuguese (Localization)
* **Pricing Model**: **100% Free Open Tool** (No paid premium features or Stripe checkouts).
* **Theming**: **Light Mode by Default**, with full support for toggling to Dark Mode.
* **Core Engine**: **AI-Powered Interpretation**
  * Uses **SiliconFlow API** with the `deepseek-ai/DeepSeek-V4-Flash` model to dynamically write highly personalized readings.
  * Falling back to client-side static templates if the API key is not configured or in case of errors.

## 2. Product Positioning & Values
* **Vision**: Create a highly interactive, SEO-driven numerology exploration tool.
* **Core Value**: Help users discover their personal vibration and angel numbers for self-exploration and reflection.
* **Expression Guidelines (Crucial for SEO & Compliance)**:
  * ❌ **Prohibited**: Avoid absolute claims, guarantee of success, or direct fortune-telling (e.g., "The universe guarantees success", "Your angel predicts your future", "You will become rich").
  * ✅ **Recommended**: Frame results as symbolic, educational, and reflective (e.g., "Symbolic interpretation", "Based on traditional numerology", "For personal reflection and self-exploration").
  * **System Instructions for AI**: The AI prompt must strictly enforce these guidelines to ensure generated responses comply with standard disclaimers.

## 3. Core User Flows & Features
1. **Landing Page (`/` or `/angel-number-calculator`)**:
   * Introduces the tool and collects inputs: **Name** (text, normalized), **Birthday** (Month/Day/Year dropdowns), and **Focus Area** (General, Love, Career, Wealth, Growth).
   * **SEO Content Block**: Add structured information explaining "What is an Angel Number?", "How it Works", "FAQ", etc.
2. **Loading Screen**:
   * A 3-second animated transition with cosmic elements and progressive text updates to build engagement.
3. **Result Page (`/result` - NOINDEX)**:
   * Displays the personal angel number (e.g., `444`).
   * Breakdown of calculation steps (Name Number + Life Path Number = Personal Vibration).
   * **AI Reading Section**: Displays a typewriter/fade-in animation loading the dynamic DeepSeek response.
   * **Client Caching**: Save the calculated AI response to `localStorage` alongside the name and birthday details.
4. **Detail Pages (`/angel-number/[number]`)**:
   * SEO pages for individual numbers with complete breakdowns.
   * **Supported Numbers**: Extends to **64 popular search sequences**:
     * Classic Triplets: `000`, `111`, `222`, `333`, `444`, `555`, `666`, `777`, `888`, `999` (10 numbers)
     * Classic Quadruplets: `1111`, `2222`, `3333`, `4444`, `5555`, `6666`, `7777`, `8888`, `9999` (9 numbers)
     * Gateway Repetitions: `1010`, `1212`, `1414`, `1515`, `1616`, `1717`, `1818`, `1919`, `2020`, `2121`, `2323`, `2525`, `3030`, `3131`, `3232`, `4040`, `4141`, `4242`, `4343`, `4545`, `5050`, `5151`, `5252`, `5353`, `5454`, `6060`, `6161`, `6262`, `6363`, `6464`, `7070`, `7171`, `7272`, `7373`, `7474` (35 numbers)
     * Mirrored / Balance Patterns: `1001`, `1110`, `1122`, `1221`, `1331`, `1441`, `1551` (7 numbers)
     * Sequential Steps: `123`, `1234`, `234` (3 numbers)
5. **Theme Switcher**:
   * A clean, accessible toggle in the navbar to switch between Light (Editorial Luxury) and Dark (Ethereal Glass) modes. Defaults to Light.

## 4. Calculator Algorithm
* Standard Pythagorean name mapping and separately reduced life path sums. Refer to `numerology.ts`.
* Vibration 6 maps back to `666` as per user instruction.

## 5. SEO & Traffic Strategy
* Tiered routing structure with Article/FAQ schemas.
