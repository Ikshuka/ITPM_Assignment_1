const { test, expect } = require('@playwright/test');

const TEST_DATA = [
  // --- POSITIVE SCENARIOS (Casual Context) ---
  { id: 'TC_Pos_01', input: 'mama ada gedara innawa.', expected: 'මට අද ගෙදර ඉන්නවා.' },
  { id: 'TC_Pos_02', input: 'oyaage nama mokakdha?', expected: 'ඔයාගේ නම මොකක්ද?' },
  { id: 'TC_Pos_03', input: 'mata vathura ekak dhenna.', expected: 'මට වතුර එකක් දෙන්න.' },
  { id: 'TC_Pos_04', input: 'Facebook eke photos dhakka.', expected: 'Facebook එකේ photos දැක්කා.' },
  { id: 'TC_Pos_05', input: 'api 2024 di hamuvemu.', expected: 'අපි 2024 දී හමුවෙමු.' },
  { id: 'TC_Pos_06', input: 'vehikul eka parissamin elavanna.', expected: 'වෙහිකුල් එක පරිස්සමින් එලවන්න.' },
  { id: 'TC_Pos_07', input: 'ehema kiyanna epaa.', expected: 'එහෙම කියන්න එපා.' },
  { id: 'TC_Pos_08', input: 'lankaave sancharaka karmanthaya diyunu veemin pavathina athara, vidheesha sancharakayin pamaNak novee dheesha sancharakayindha vividha pradheesha valata yaamataruchi katha dakvathi.', expected: 'ලංකාවේ සංචාරක කර්මාන්තය දියුණු වෙමින් පවතින අතර, විදේශ සංචාරකයින් පමණක් නොව දේශ සංචාරකයින්ද විවිධ ප්‍රදේශ වලට යාමටරුචි කත දක්වති.' },
  { id: 'TC_Pos_09', input: 'man eeye ave na.', expected: 'මන් ඊයේ අවේ නෑ.' },
  { id: 'TC_Pos_10', input: 'puluwannam mata call ekak ganna.', expected: 'පුළුවන්නම් මට call එකක් ගන්න.' },
  { id: 'TC_Pos_11', input: 'api heta cinema yamu.', expected: 'අපි හෙට cinema යමු.' },
  { id: 'TC_Pos_12', input: 'yaluwo tika enawa.', expected: 'යාලුවෝ ටික එනවා.' },
  { id: 'TC_Pos_13', input: 'nangi paadam karanawa, eyaata disturb karanna epa.', expected: 'නංගි පාඩම් කරනවා, එයාට disturb කරන්න එපා.' },
  { id: 'TC_Pos_14', input: 'api kothatadha \n yanne?', expected: 'අපි කොතටද \n යන්නේ?' },
  { id: 'TC_Pos_15', input: 'SLIIT eke degree eka.', expected: 'SLIIT එකේ degree එක.' },
  { id: 'TC_Pos_16', input: 'haall 5 kg k gennanna.', expected: 'හාල් 5 kg ක් ගෙන්නන්න.' },
  { id: 'TC_Pos_17', input: 'ticket eka Rs. 1500 yi.', expected: 'ticket එක Rs. 1500 යි.' },
  { id: 'TC_Pos_18', input: 'ado mehe varen!', expected: 'අඩෝ මෙහෙ වරෙන්!' },
  { id: 'TC_Pos_19', input: 'ikmanata ikmanata kanna.', expected: 'ඉක්මනට ඉක්මනට කන්න.' },
  { id: 'TC_Pos_20', input: 'Project eke deadline eka kavadhadha?', expected: 'Project එකේ deadline එක කවදද?' },
  { id: 'TC_Pos_21', input: 'api   kanne   monawadha?', expected: 'අපි   කන්නේ   මොනවද?' },
  { id: 'TC_Pos_22', input: 'Colombo vala traffic wadi.', expected: 'Colombo වල traffic වැඩි.' },
  { id: 'TC_Pos_23', input: 'bus eka 6.00 PM ta thiyenne.', expected: 'bus එක 6.00 PM ට තියෙන්නේ.' },
  { id: 'TC_Pos_24', input: 'aeaa lassanai.', expected: 'ඇය ලස්සනයි.' },

  // --- NEGATIVE SCENARIOS ---
  { id: 'TC_Neg_01', input: 'apiseramaekatayamu', expected: 'අපිසේරමඑකටයමු' },
  { id: 'TC_Neg_02', input: 'mokakdha prashne????', expected: 'මොකක්ද ප්‍රශ්නේ????' },
  { id: 'TC_Neg_03', input: 'blla buranava', expected: 'බ්ල්ල බුරනව' },
  { id: 'TC_Neg_04', input: 'MaMa YanNe Naa', expected: 'මම යන්නේ නෑ' },
  { id: 'TC_Neg_05', input: 'phone eka charge venawa.', expected: 'phone එක charge වෙනවා.' },
  { id: 'TC_Neg_06', input: 'man yanawa oya innawa', expected: 'මන් යනවා ඔය ඉන්නවා' },
  { id: 'TC_Neg_07', input: '   gedhara   yamu   ', expected: '   ගෙදර   යමු   ' },
  { id: 'TC_Neg_08', input: 'kiri1L k ganna.', expected: 'කිරි1L ක් ගන්න.' },
  { id: 'TC_Neg_09', input: 'website eka www.google.com', expected: 'website එක www.google.com' },
  { id: 'TC_Neg_10', input: '', expected: '' },

  // --- UI SCENARIO ---
  { id: 'TC_UI_01', input: 'api dennatama badagini', expected: 'අපි දෙන්නටම බඩගිනි' }
];

test.describe('Friend 1 Test Suite', () => {
  test.setTimeout(180000); // 3 minutes timeout

  test('Casual Conversational Tests', async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/');
    const inputLoc = page.getByPlaceholder('Input Your Singlish Text Here.');
    const outputLoc = page.locator('div.whitespace-pre-wrap').first();

    for (const testCase of TEST_DATA) {
      console.log(`\nTesting: ${testCase.id}`);
      
      // Clear and Type
      await page.keyboard.press('Escape');
      await inputLoc.fill('');
      
      if (testCase.input) {
        await inputLoc.fill(testCase.input);
      } else {
        await inputLoc.press('Backspace');
      }

      // Wait and Assert
      await page.waitForTimeout(3000);
      const result = await outputLoc.innerText();
      
      // Logging logic
      if (result.trim() === testCase.expected.trim()) {
        console.log(`[PASS] ${testCase.input} -> ${result}`);
      } else {
        console.log(`[FAIL] Expected: ${testCase.expected} | Got: ${result}`);
      }

      expect.soft(result.trim()).toBe(testCase.expected.trim());
    }
  });
});