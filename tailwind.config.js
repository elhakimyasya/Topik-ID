module.exports = {
  darkMode: "class",
  content: [
    "./src/*.{xml,html,js}",
    "./src/partials/*/*.{xml,html,js}",
    "./src/partials/*/*/*.{xml,html,js}",
    "./src/assets/scripts/**/*.{xml,html,js}"
  ],
  theme: {
    extend: {
      borderRadius: {
        "optionNavbarSearchRadius": "var(--optionNavbarSearchRadius)",
        "optionDrawerMenuItemRadius": "var(--optionDrawerMenuItemRadius)",
        "optionIndexRadius": "var(--optionIndexRadius)",
        "optionIndexThumbnailRadius": "var(--optionIndexThumbnailRadius)",
        "optionItemAuthorImageRadius": "var(--optionItemAuthorImageRadius)",
        "optionItemAboutAuthorImageRadius": "var(--optionItemAboutAuthorImageRadius)",
        "optionItemCommentAuthorImageRadius": "var(--optionItemCommentAuthorImageRadius)",
        "optionGadgetPopularPostThumbnailRadius": "var(--optionGadgetPopularPostThumbnailRadius)",
        "optionGadgetBlogListThumbnailRadius": "var(--optionGadgetBlogListThumbnailRadius)",
        "optionGadgetFeaturedPostThumbnailRadius": "var(--optionGadgetFeaturedPostThumbnailRadius)",
      },
      borderWidth: {
        "3px": "3px",
      },
      boxShadow: {
        "boxshadow1": "inset 1px 0 var(--colorKey), inset -1px 0 var(--colorKey), inset 0 -1px var(--colorKey), inset 0 1px var(--colorKey)",
        "2dp": "0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)",
        "4dp": "0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12)",
        "6dp": "0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12)",
        "24dp": "0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12)"
      },
      colors: {
        "colorBackground": "var(--colorBackground)",
        "colorBackgroundTrans1": "var(--colorBackgroundTrans1)",
        "colorBackgroundTrans2": "var(--colorBackgroundTrans2)",
        "colorText": "var(--colorText)",
        "colorTextTrans1": "var(--colorTextTrans1)",
        "colorTextTrans2": "var(--colorTextTrans2)",
        "colorButtonIcon": "var(--colorButtonIcon)",
        "colorButtonIconTrans1": "var(--colorButtonIconTrans1)",
        "colorButtonIconTrans2": "var(--colorButtonIconTrans2)",
        "colorBorder": "var(--colorBorder)",
        "colorKey": "var(--colorKey)",
        "colorKeyTrans1": "var(--colorKeyTrans1)",
        "colorKeyTrans2": "var(--colorKeyTrans2)",
        "colorMeta": "var(--colorMeta)",

        "colorNavbarBackground": "var(--colorNavbarBackground)",
        "colorNavbarText": "var(--colorNavbarText)",
        "colorNavbarTextTrans1": "var(--colorNavbarTextTrans1)",
        "colorNavbarTextTrans2": "var(--colorNavbarTextTrans2)",
        "colorNavbarEdgeBorder": "var(--colorNavbarEdgeBorder)",
        "colorNavbarEdgeShadow": "var(--colorNavbarEdgeShadow)",

        "colorDrawerMenuEdgeShadow": "var(--colorDrawerMenuEdgeShadow)",
        "colorDrawerMenuBackground": "var(--colorDrawerMenuBackground)",
        "colorDrawerMenuItem": "var(--colorDrawerMenuItem)",
        "colorDrawerMenuItemTrans1": "var(--colorDrawerMenuItemTrans1)",
        "colorDrawerMenuItemTrans2": "var(--colorDrawerMenuItemTrans2)",
        "colorDrawerMenuItemSelected": "var(--colorDrawerMenuItemSelected)",
        "colorDrawerMenuItemSelectedTrans1": "var(--colorDrawerMenuItemSelectedTrans1)",
        "colorDrawerMenuItemSelectedTrans2": "var(--colorDrawerMenuItemSelectedTrans2)",
        "colorDrawerMenuDelimiter": "var(--colorDrawerMenuDelimiter)",
        "colorDrawerMenuEdgeBorder": "var(--colorDrawerMenuEdgeBorder)",

        "colorMoreMenuBackground": "var(--colorMoreMenuBackground)",
        "colorMoreMenuItem": "var(--colorMoreMenuItem)",
        "colorMoreMenuItemTrans1": "var(--colorMoreMenuItemTrans1)",
        "colorMoreMenuItemTrans2": "var(--colorMoreMenuItemTrans2)",
        "colorMoreMenuItemSelected": "var(--colorMoreMenuItemSelected)",
        "colorMoreMenuItemSelectedTrans1": "var(--colorMoreMenuItemSelectedTrans1)",
        "colorMoreMenuShadowTrans2": "var(--colorMoreMenuShadowTrans2)",

        "colorTabbedMenu": "var(--colorTabbedMenu)",
        "colorTabbedMenuHover": "var(--colorTabbedMenuHover)",
        "colorTabbedMenuSelected": "var(--colorTabbedMenuSelected)",

        "colorIndexBackground": "var(--colorIndexBackground)",
        "colorIndexEdgeBorder": "var(--colorIndexEdgeBorder)",
        "colorIndexLabel": "var(--colorIndexLabel)",
        "colorIndexLabelHover": "var(--colorIndexLabelHover)",
        "colorIndexTitle": "var(--colorIndexTitle)",
        "colorIndexTitleHover": "var(--colorIndexTitleHover)",
        "colorIndexMeta": "var(--colorIndexMeta)",
        "colorIndexSummary": "var(--colorIndexSummary)",
        "colorIndexJumplink": "var(--colorIndexJumplink)",
        "colorIndexCommentlink": "var(--colorIndexCommentlink)",
        "colorIndexPagination": "var(--colorIndexPagination)",
        "colorIndexPaginationTrans1": "var(--colorIndexPaginationTrans1)",
        "colorIndexPaginationTrans2": "var(--colorIndexPaginationTrans2)",
        "colorIndexEdgeShadowTrans2": "var(--colorIndexEdgeShadowTrans2)",

        "colorItemBorder": "var(--colorItemBorder)",
        "colorItemBreadcrumb": "var(--colorItemBreadcrumb)",
        "colorItemTitle": "var(--colorItemTitle)",
        "colorItemText": "var(--colorItemText)",
        "colorItemTextTrans1": "var(--colorItemTextTrans1)",
        "colorItemTextTrans2": "var(--colorItemTextTrans2)",
        "colorItemTextTrans3": "var(--colorItemTextTrans3)",
        "colorItemLink": "var(--colorItemLink)",
        "colorItemDescription": "var(--colorItemDescription)",
        "colorItemMeta": "var(--colorItemMeta)",
        "colorItemKey": "var(--colorItemKey)",
        "colorItemLabelListText": "var(--colorItemLabelListText)",
        "colorItemLabelListBorder": "var(--colorItemLabelListBorder)",
        "colorItemAboutAuthorBorder": "var(--colorItemAboutAuthorBorder)",
        "colorItemAboutAuthorName": "var(--colorItemAboutAuthorName)",
        "colorItemAboutAuthorDescription": "var(--colorItemAboutAuthorDescription)",
        "colorItemCommentMessage": "var(--colorItemCommentMessage)",
        "colorItemCommentBackground": "var(--colorItemCommentBackground)",
        "colorItemCommentShadowTrans2": "var(--colorItemCommentShadowTrans2)",
        "colorItemCommentAuthorName": "var(--colorItemCommentAuthorName)",
        "colorItemCommentAuthorNameHover": "var(--colorItemCommentAuthorNameHover)",
        "colorItemCommentMeta": "var(--colorItemCommentMeta)",
        "colorItemCommentBorder": "var(--colorItemCommentBorder)",
        "colorItemCommentContent": "var(--colorItemCommentContent)",
        "colorItemCommentContentTrans1": "var(--colorItemCommentContentTrans1)",
        "colorItemCommentContentLink": "var(--colorItemCommentContentLink)",
        "colorItemCommentButton": "var(--colorItemCommentButton)",
        "colorItemCommentButtonTrans1": "var(--colorItemCommentButtonTrans1)",
        "colorItemCommentButtonTrans2": "var(--colorItemCommentButtonTrans2)",

        "colorGadgetKey": "var(--colorGadgetKey)",
        "colorGadgetBorder": "var(--colorGadgetBorder)",
        "colorGadgetTitle": "var(--colorGadgetTitle)",
        "colorGadgetTitleIndicator": "var(--colorGadgetTitleIndicator)",
        "colorGadgetLink": "var(--colorGadgetLink)",
        "colorGadgetLinkHover": "var(--colorGadgetLinkHover)",
        "colorGadgetMeta": "var(--colorGadgetMeta)",
        
        "colorColorModeDarkBackground": "var(--colorColorModeDarkBackground)",
        "colorColorModeDarkBackgroundAlt": "var(--colorColorModeDarkBackgroundAlt)",
        "colorColorModeDarkBackgroundTrans1": "var(--colorColorModeDarkBackgroundTrans1)",
        "colorColorModeDarkBackgroundTrans2": "var(--colorColorModeDarkBackgroundTrans2)",
        "colorColorModeDarkText": "var(--colorColorModeDarkText)",
        "colorColorModeDarkTextTrans1": "var(--colorColorModeDarkTextTrans1)",
        "colorColorModeDarkTextTrans2": "var(--colorColorModeDarkTextTrans2)",
        "colorColorModeDarkBorder": "var(--colorColorModeDarkBorder)",
        "colorColorModeDarkKey": "var(--colorColorModeDarkKey)",
        "colorColorModeDarkKeyTrans1": "var(--colorColorModeDarkKeyTrans1)",
        "colorColorModeDarkKeyTrans2": "var(--colorColorModeDarkKeyTrans2)",
        "colorColorModeDarkMeta": "var(--colorColorModeDarkMeta)",

        "colorRippleEffect": "var(--colorRippleEffect)",
        "colorProgressBar": "var(--colorProgressBar)",
        "colorScrollIndicator": "var(--colorScrollIndicator)",

      },
      content: {
        "ic-chevron": "url(data:image/webp;base64,UklGRogAAABXRUJQVlA4WAoAAAAQAAAAFwAAFwAAQUxQSDIAAAABJ0CkbRvb2BwfPiKC5WEoso0/FBBCABXMvP6pcHOP6P8E6PMAsEkNqTXANnXqWH55E1ZQOCAwAAAAsAIAnQEqGAAYAC5pSKRSIiWlpYWAaEtIBmaDDtGoAP7wiP///aFqzPL/vfxDIAAA)"
      },
      fontFamily: {
        "rubik": "'Rubik', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif",
        "google-sans-text": "'Google Sans Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif",
        "mono": "ui-monospace, 'Cascadia Mono', 'Segoe UI Mono', 'Liberation Mono', Menlo, Monaco, Consolas, monospace",
        "fontFamily": "Materia, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif"
      },
      maxWidth: {
        "optionMainWidth": "var(--optionMainWidth)",
        "optionNavbarSearchMaxWidth": "var(--optionNavbarSearchMaxWidth)",
      },
    },
  },
  plugins: [
    require('tailwindcss'),
    require('@tailwindcss/line-clamp'),
    require('autoprefixer'),
  ],
}