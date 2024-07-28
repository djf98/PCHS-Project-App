import os
import json

def generate_manifest(base_folder, emotions):
    manifest = {}
    
    for emotion in emotions:
        folder_path = os.path.join(base_folder, emotion)
        if os.path.isdir(folder_path):
            image_files = [f for f in os.listdir(folder_path) if f.endswith('.png')]
            manifest[emotion] = image_files
    
    return manifest

def save_manifest(manifest, filename='manifest.json'):
    with open(filename, 'w') as file:
        json.dump(manifest, file, indent=4)

def main():
    base_folder = 'photos'
    emotions = ['angry', 'disgusted', 'fearful', 'happy', 'neutral', 'sad', 'surprised']
    
    manifest = generate_manifest(base_folder, emotions)
    save_manifest(manifest)
    print(f'Manifest saved as manifest.json with {len(manifest)} categories.')

if __name__ == '__main__':
    main()
