import * as faceapi from 'face-api.js';

// Function to compare two face descriptors
export async function verifyFace(descriptor1, descriptor2) {
    if(!descriptor1 || !descriptor2) {
        alert('Invalid face descriptors provided.');
        //redirect to login page
        window.location.href = '/voter/login';
        return false;
    }
  try {
    // Create labeled face descriptors
    const labeledDescriptors = [
      new faceapi.LabeledFaceDescriptors('Person1', [descriptor1]),
    ];

    // Create a face matcher with a threshold (lower is stricter, 0.6 is common)
    const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.5);

    // Find the best match for the second descriptor
    const bestMatch = faceMatcher.findBestMatch(descriptor2);

    // Output the result
    if (bestMatch.label === 'Person1') {
      console.log(`Match found: ${bestMatch.label} with distance ${bestMatch.distance}`);
      return true;
    } else {
      console.log(`No match found: ${bestMatch.toString()}`);
      return false;
    }
  } catch (error) {
    console.error('Error comparing faces:', error);
    return false;
  }
}

