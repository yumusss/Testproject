# Testproject

Expo (React Native + TypeScript) uygulaması. Navigasyon [expo-router](https://docs.expo.dev/router/introduction/) ile yapılır; iki sekme vardır: **Ana Sayfa** ve **Ayarlar**.

## Proje yapısı

```
app/
  _layout.tsx          # Kök Stack + tema
  (tabs)/
    _layout.tsx        # Tab navigasyonu
    index.tsx          # Ana Sayfa
    settings.tsx       # Ayarlar
  +not-found.tsx
components/            # Ortak bileşenler ve hook'lar
constants/             # Renkler vb.
app.json               # Expo yapılandırması (iOS bundleIdentifier, Android package)
eas.json               # EAS Build profilleri
```

## Gereksinimler

- Node.js 20+ ve npm
- iOS Simulator için macOS + Xcode, Android Emulator için Android Studio (isteğe bağlı)
- EAS Build için bir [Expo hesabı](https://expo.dev/signup)

## Çalıştırma

```bash
npm install
npm start          # Metro dev server'ı başlatır
```

Terminalde açılan menüden:

- `i` → iOS Simulator
- `a` → Android Emulator
- `w` → Web

Kısayollar: `npm run ios`, `npm run android`, `npm run web`.

> Proje `expo-dev-client` içerir. Expo Go ile de açılabilir; ancak Expo Go'da bulunmayan native bir modül eklendiğinde bir development build gerekir (aşağıya bakın).

## Kod kalitesi

```bash
npm run lint           # ESLint (eslint-config-expo + Prettier)
npm run format         # Prettier ile tüm dosyaları biçimlendir
npm run format:check   # Biçimlendirmeyi kontrol et
npm run typecheck      # tsc --noEmit
```

## EAS Build

### İlk kurulum

```bash
npm install -g eas-cli   # veya her komutta: npx eas-cli@latest <komut>
eas login
eas init                 # Projeyi Expo hesabına bağlar, app.json'a projectId ekler
```

iOS bundle identifier `app.json` içinde `ios.bundleIdentifier` (`com.yumusss.testproject`), Android paket adı `android.package` alanındadır. Mağazaya göndermeden önce bunları kendi değerlerinizle değiştirin.

### Profiller (`eas.json`)

| Profil        | Amaç                                          | Dağıtım                           |
| ------------- | --------------------------------------------- | --------------------------------- |
| `development` | `expo-dev-client` içeren geliştirme build'i   | internal (iOS: simülatör build'i) |
| `preview`     | Test ekibi için production benzeri build      | internal (Android: APK)           |
| `production`  | Mağaza build'i, build numarası otomatik artar | App Store / Google Play           |

### Build komutları

```bash
# Development build
eas build --profile development --platform ios
eas build --profile development --platform android

# Preview (internal dağıtım)
eas build --profile preview --platform all

# Production
eas build --profile production --platform all
```

Development build cihaza/simülatöre kurulduktan sonra dev server'ı şu komutla başlatın:

```bash
npx expo start --dev-client
```

> iOS internal dağıtımda fiziksel cihaz için önce `eas device:create` ile cihazı kaydedin. Development profili simülatör build'i üretir; fiziksel cihaz istiyorsanız `eas.json`'da `development.ios.simulator` değerini `false` yapın.

### Mağazaya gönderme

```bash
eas submit --profile production --platform ios
eas submit --profile production --platform android
```
