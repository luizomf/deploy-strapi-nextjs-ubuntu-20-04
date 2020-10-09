# Apaguei alumas pastas do outro blog
rm -Rf .git node_modules out* .next netlify.toml next.config.js

# Removi o next-on-netlify do package.json
"next-on-netlify"
"postbuild": "next-on-netlify",

# Reinstalei tudo e testei
npm i
npm run dev
npm run build
npm start
