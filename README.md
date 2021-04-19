# Brahmilator - Systematic approach to translate Early Brahmi Inscriptions

This project aims to provide a systematic solution to recognize the characters in ancient Sri Lankan inscriptions and translate them into Sinhala and other native languages.

# Essential Directory Layout

```
.
├── LICENSE.md
├── README.md
├── brahmi_backend
│   ├── Dockerfile
│   ├── classification_model
│   │   ├── brahmi_classifier.py
│   │   └── mobilenet_engine
│   ├── controller.py
│   ├── database
│   │   ├── BrahmiWordsLibrary.db
│   │   ├── BrahmiWordsLibrary.db-journal
│   │   ├── DatabaseHelper.py
│   │   └── db.csv
│   ├── input_data
│   ├── requirements.txt
│   ├── segmentation_module
│   │   ├── segmentation.py
│   │   └── segmented_letters
│   ├── tested_plates
│   ├── utils
│   │   └── util.py
│   └── word_finder_module
│       └── possible_word_finder.py
├── cloudbuild.yaml
└── front_end
    └── tyrants
        ├── App.js
        ├── README.md
        ├── android
        ├── app.json
        ├── babel.config.js
        ├── index.js
        ├── ios
        ├── metro.config.js
        ├── node_modules
        ├── package-lock.json
        ├── package.json
        └── src
```
# Prerequisites
- React-Native
- Python 3.7
- Tensorflow
- MongoDB
- OpenCV
- Docker