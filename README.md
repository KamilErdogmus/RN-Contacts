# Contact List Application in React Native

## Description

Contact List is a React Native mobile application designed for managing personal contacts efficiently. The app provides seamless contact management with features including adding, editing, deleting, and searching contacts. It utilizes Zustand for state management, ensuring efficient handling of contact data, while SQLite provides local storage capabilities. Form handling is streamlined with Formik and Yup validation. The app features a clean and responsive UI with smooth animations and an intuitive navigation system, delivering a professional user experience.

## Libraries and Tools

- **@react-navigation/bottom-tabs**: Implements bottom tab navigation for seamless switching between main sections like home or profile.
- **@react-navigation/native**: Provides the core navigation infrastructure, managing screen transitions and navigation flow.
- **@react-navigation/native-stack**: Enables stack-based navigation for smooth transitions between contact details and form screens.
- **formik**: Manages form handling for adding and editing contacts, simplifying form state and submission processes.
- **yup**: Implements schema validation for form fields, ensuring data integrity and proper format validation (e.g., email format checks).
- **zustand**: A lightweight state management solution that efficiently handles global state for contact lists and app preferences.
- **react-native-sqlite-storage**: Enables local SQLite database storage for persistent contact data management.
- **react-native-toast-message**: Displays informative toast notifications for success messages and error alerts.
- **react-native-vector-icons**: Provides a comprehensive set of icons for UI elements like delete, edit, and other action buttons.
- **react-native-gesture-handler**: Implements gesture recognition for swipe actions in contact lists (e.g., swipe to delete/edit).
- **react-native-reanimated**: Powers smooth animations for contact interactions and list movements.
- **react-native-safe-area-context**: Ensures proper content positioning across different devices (e.g., iPhone models with notches).
- **react-native-screens**: Optimizes navigation performance through native screen container management.

## Preview

<img src="src/assets/" height="600" />

## Installation

To run the project locally follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/KamilErdogmus/RN-Contacts.git
```

2. Navigate to the project directory:

```bash
cd your-repository
```

3. Install dependencies:

#### Using npm

```bash
npm install
```

#### Using yarn

```bash
yarn install
```

If you're using MacOS, navigate to the ios folder and install CocoaPods dependencies:

```bash
cd ios
```

```bash
 pod install
```

```bash
 cd ..
```

## Step 1: Start the Metro Server

First, you'll need to start **Metro**, the JavaScript _bundler_ that comes with React Native.

To start Metro, run the following command from the _root_ of your React Native project:

#### Using npm

```bash
npx expo start
```

#### Using Yarn

```bash
yarn expo start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

##### using npm

```bash
npx expo run android
```

#### Using Yarn

```bash

yarn android
```

### For iOS

##### using npm

```bash
npx expo run ios
```

#### Using Yarn

```bash
yarn ios
```
