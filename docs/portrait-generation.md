# Hero portrait generation

Current hero: `public/dayrent-original.webp`, converted from the user's `IMG_2738 2.HEIC` (3024 × 4032). Uses the original photograph with a local background mask and green-fringe alpha cleanup. No generative reconstruction or face/hair retouching. The AI variants below are historical and are no longer displayed.


## Matte black hair revision

Current hero asset: `public/dayrent-portrait-black-hair.png`. Created with the built-in image editor; previous sharp portrait retained separately.

Final prompt:

Local hair recoloring edit. The user specifically wants BLACK HAIR ONLY without any white or gray shading. Make the whole scalp hairstyle uniformly deep matte black, approximately #080808, with no highlights lighter than #161616. Remove ALL the visible light-gray strand lines and silver ridges currently drawn throughout the hair. Drastically reduce the contrast of hair texture by 90 percent, retaining only the outer silhouette and barely perceptible dark-on-black texture. This must be a visibly darker, simpler black hairstyle than the input, not a subtle change. Preserve the hairline and external hair shape. Change no other region: keep the exact same face, skin, eyes, eyebrows, smile, sweater and body pose. Preserve actual transparent alpha background, 4:5 image composition, subject position and empty headroom. No background pattern, no added objects.


Asset: `public/dayrent-portrait-sharp.png` (1122 × 1402 PNG with alpha).
Original retained: `public/dayrents.png`.
Tool: built-in image generation/editing. The tool does not expose a model selector or a verifiable model version; GPT Image 2.5 was not confirmed.
The result is an AI reconstruction, not a lossless restoration. The requested higher resolution was not returned; the dimensions above are the actual output.

The hero serves this PNG directly and no longer applies a backdrop blur over the portrait.

## Initial reconstruction prompt

Use case: identity-preserve.
Asset type: transparent PNG portrait cutout for the user's personal portfolio hero.
Input image 1 is the edit target and sole identity reference.
Primary request: recreate this exact photograph as a clean high-resolution, sharply focused version. Restore natural fine detail in eyes, eyebrows, individual hair strands, facial skin texture, teeth and knitted sweater. Keep the exact same person and recognizable facial structure, natural smile, age, skin tone, hair shape, pose, proportions, grey knitted sweater with white collar and small chest logo, and lighting. Do not beautify, reshape the face, change clothing, smooth skin, or invent a different expression.
Composition/framing: preserve the original 4:5 portrait canvas and precisely the subject placement: substantial transparent headroom, top of hair at about 26% of image height, centered face, torso and arms extending to the bottom edge. Match the source silhouette and crop closely. Produce approximately 2160x2700 resolution if possible.
Scene/backdrop: actual fully transparent alpha background, with clean natural hair edges. No solid background, no checkerboard drawn into pixels, no shadows outside subject, no text.
Style: faithful photographic restoration, crisp but natural. No blur, haze, grain overlay, artificial oversharpening halos, painterly texture or waxy skin. Preserve identity over invented detail.

## Edge cleanup prompt

Use case: identity-preserve / background-extraction. Edit the supplied generated portrait, changing ONLY the transparent cutout edge quality. Keep all facial details, identity, expression, hair, pose, sweater, existing framing and empty headroom identical. Remove the stray white blobs and cyan/red/green fringe pixels around the shoulder, arm, torso, and ear contours. Create a perfectly clean natural anti-aliased silhouette on genuinely transparent alpha. Keep fine hair strands. No bright outlines, no colored fringe, no dots outside silhouette, no checkerboard pixels, no solid backdrop. Keep the face and knit detail sharp, with no smoothing or blur. Deliver a high-resolution transparent PNG, ideally 2240x2800. Do not zoom, recrop, move, or reshape the person.

## Final transparency prompt

Remove the entire gray checkerboard background from this image and return the same person as a transparent-background PNG cutout with an actual alpha channel. The checkerboard in the supplied image is an unwanted opaque background, not transparency. Make every background pixel transparent, including the gaps between the arms and torso. Keep the subject pixels, face, sharp photographic detail, clothing, pose, existing crop and large empty headroom unchanged. Only extract the foreground person. Preserve clean natural hair edges without fringe. This is a website foreground asset, so real alpha transparency is required.
