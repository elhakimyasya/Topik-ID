import { initializeApp } from "firebase/app";
import { addDoc, collection, collectionGroup, deleteDoc, doc, getFirestore, limit, onSnapshot, orderBy, query, serverTimestamp, setDoc, startAfter, updateDoc, where } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithRedirect, signOut } from "firebase/auth";

((dashboardPage, options) => {
    if (location.href.indexOf(dashboardPage) != -1) {
        // Init Firebase
        initializeApp(options.getConfig);

        // Checking URLS and its params
        const urls = window.location.toString();
        if (urls.indexOf('&m=1', '&m=1') > 0) {
            const clean_uri = urls.substring(0, urls.indexOf('&m=1'));
            window.history.replaceState({}, document.title, clean_uri);
        }
        if (urls.indexOf('?m=1', '?m=1') > 0) {
            const clean_uri = urls.substring(0, urls.indexOf('?m=1'));
            window.history.replaceState({}, document.title, clean_uri);
        };
        let dashboardUrl;
        window.location.href.split('?').pop().split('&').map((urls) => {
            return dashboardUrl = urls.replace('%3D', '=').split('=');
        });

        const firestoreDatabase = getFirestore();
        const firebaseAuth = getAuth();

        const formatDate = (dateData) => {
            const day = dateData.toDate().getDate();
            const month = dateData.toDate().toLocaleString('default', { month: 'long' });
            const year = dateData.toDate().getFullYear();

            return `${month} ${day}, ${year}`;
        };

        const postEditor = (reference, postEditorOptions) => {
            const tinyMCEOptions = {
                selector: '#post_contents',
                branding: false,
                menubar: 'file edit view insert format tools table custom',
                contextmenu: false,
                plugins: 'link image preview codesample table toc wordcount code lists insertdatetime emoticons visualblocks autoresize',
                toolbar: 'formatselect | bold italic underline strikethrough superscript subscript blockquote | link image | alignleft aligncenter alignright alignjustify bullist numlist | table toc | codesample preview insertdatetime emoticons visualblocks code',
                toolbar_sticky: true,
                toolbar_sticky_offset: 64,
                toc_class: 'elcTOC',
                toc_depth: 6,
                content_css: 'https://cdn.jsdelivr.net/gh/elhakimyasya/Bloggeria@main/dist/styles/materia-auth-tinymce.min.css',
                content_css_cors: true,
                extended_valid_elements: 'img[src|loading=lazy|alt|title|width|height|align|onmouseover|onmouseout|name]',
                insertdatetime_formats: ['Updated: %A, %d %B %Y'],
                // skin: (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'oxide-dark' : 'oxide'),
                // skin: useDarkMode ? 'oxide-dark' : 'oxide',
                mobile: {
                    menubar: 'file edit view insert format tools table custom',
                    toolbar_sticky: true,
                },
                rel_list: [{ // link_rel_list
                    title: 'Internal Link',
                    value: ''
                }, {
                    title: 'External Link',
                    value: 'noopener noreferer nofollow'
                }],
                codesample_languages: [{
                    text: 'Command Line',
                    value: 'command hljs hl hljs'
                }, {
                    text: 'CSS',
                    value: 'css hljs hl css'
                }, {
                    text: 'C',
                    value: 'c hljs hl c'
                }, {
                    text: 'C++',
                    value: 'cpp hljs hl cpp'
                }, {
                    text: 'HTML/XML',
                    value: 'html hljs hl html xml'
                }, {
                    text: 'Java',
                    value: 'java hljs hl java'
                }, {
                    text: 'JavaScript',
                    value: 'javascript hljs hl javascript'
                }, {
                    text: 'JSON',
                    value: 'json hljs hl json'
                }, {
                    text: 'Markdown',
                    value: 'markdown hljs hl markdown'
                }, {
                    text: 'PHP',
                    value: 'php hljs hl php'
                }, {
                    text: 'Python',
                    value: 'python hljs hl python'
                }, {
                    text: 'TypeScript',
                    value: 'typescript hljs hl typescript'
                }],

                menu: {
                    custom: {
                        title: 'Components',
                        items: 'alerts buttons     basicitem toggleitem'
                    }
                },
                setup: function (editor) {
                    var toggleState = false;

                    editor.ui.registry.addNestedMenuItem('alerts', {
                        text: 'Alerts',

                        getSubmenuItems: function () {
                            return [
                                {
                                    type: 'menuitem',
                                    text: 'Alert - Default',
                                    onAction: function () {
                                        editor.insertContent(`<div class='elcreative_alert'>Alert</div>\n`);
                                    }
                                },
                                {
                                    type: 'menuitem',
                                    text: 'Alert - Info',
                                    onAction: function () {
                                        editor.insertContent(`<div class='elcreative_alert alert_info'>Alert</div>`);
                                    }
                                },
                                {
                                    type: 'menuitem',
                                    text: 'Alert - Success',
                                    onAction: function () {
                                        editor.insertContent(`<div class='elcreative_alert alert_success'>Alert</div>`);
                                    }
                                },
                                {
                                    type: 'menuitem',
                                    text: 'Alert - Warning',
                                    onAction: function () {
                                        editor.insertContent(`<div class='elcreative_alert alert_warning'>Alert</div>`);
                                    }
                                },
                                {
                                    type: 'menuitem',
                                    text: 'Alert - Error',
                                    onAction: function () {
                                        editor.insertContent(`<div class='elcreative_alert alert_error'>Alert</div>`);
                                    }
                                },

                                {
                                    type: 'menuitem',
                                    text: 'Alert Outline - Default',
                                    onAction: function () {
                                        editor.insertContent(`<div class='elcreative_alert alert_outline'>Alert</div>`);
                                    }
                                },
                                {
                                    type: 'menuitem',
                                    text: 'Alert Outline - Info',
                                    onAction: function () {
                                        editor.insertContent(`<div class='elcreative_alert alert_outline alert_info'>Alert</div>`);
                                    }
                                },
                                {
                                    type: 'menuitem',
                                    text: 'Alert Outline - Success',
                                    onAction: function () {
                                        editor.insertContent(`<div class='elcreative_alert alert_outline alert_success'>Alert</div>`);
                                    }
                                },
                                {
                                    type: 'menuitem',
                                    text: 'Alert Outline - Warning',
                                    onAction: function () {
                                        editor.insertContent(`<div class='elcreative_alert alert_outline alert_warning'>Alert</div>`);
                                    }
                                },
                                {
                                    type: 'menuitem',
                                    text: 'Alert Outline - Error',
                                    onAction: function () {
                                        editor.insertContent(`<div class='elcreative_alert alert_outline alert_error'>Alert</div>`);
                                    }
                                }
                            ];
                        }
                    });

                    editor.ui.registry.addNestedMenuItem('buttons', {
                        text: 'Button Link',

                        getSubmenuItems: function () {
                            return [
                                {
                                    type: 'menuitem',
                                    text: 'Button - Default',
                                    onAction: function () {
                                        editor.insertContent(`<a class='elcreative_button elcreative_ripple' href='#'>Button</a>`);
                                    }
                                },
                                {
                                    type: 'menuitem',
                                    text: 'Button - Outlined',
                                    onAction: function () {
                                        editor.insertContent(`<a class='elcreative_button elcreative_ripple outlined' href='#'>Button</a>`);
                                    }
                                },
                                {
                                    type: 'menuitem',
                                    text: 'Button - Unelevated',
                                    onAction: function () {
                                        editor.insertContent(`<a class='elcreative_button elcreative_ripple unelevated' href='#'>Button</a>`);
                                    }
                                },
                                {
                                    type: 'menuitem',
                                    text: 'Button - Raised',
                                    onAction: function () {
                                        editor.insertContent(`<a class='elcreative_button elcreative_ripple raised' href='#'>Button</a>`);
                                    }
                                },
                                {
                                    type: 'menuitem',
                                    text: 'Button Rounded - Default',
                                    onAction: function () {
                                        editor.insertContent(`<a class='elcreative_button elcreative_ripple rounded' href='#'>Button</a>`);
                                    }
                                },
                                {
                                    type: 'menuitem',
                                    text: 'Button Rounded - Outlined',
                                    onAction: function () {
                                        editor.insertContent(`<a class='elcreative_button elcreative_ripple rounded outlined' href='#'>Button</a>`);
                                    }
                                },
                                {
                                    type: 'menuitem',
                                    text: 'Button Rounded - Unelevated',
                                    onAction: function () {
                                        editor.insertContent(`<a class='elcreative_button elcreative_ripple rounded unelevated' href='#'>Button</a>`);
                                    }
                                },
                                {
                                    type: 'menuitem',
                                    text: 'Button Rounded - Raised',
                                    onAction: function () {
                                        editor.insertContent(`<a class='elcreative_button elcreative_ripple rounded raised' href='#'>Button</a>`);
                                    }
                                },
                            ]
                        }
                    });

                    // editor.ui.registry.addMenuItem('basicitem', {
                    //     text: 'My basic menu item',
                    //     onAction: function () {
                    //         editor.insertContent('<p>Here\'s some content inserted from a basic menu!</p>');
                    //     }
                    // });

                    // editor.ui.registry.addToggleMenuItem('toggleitem', {
                    //     text: 'My toggle menu item',
                    //     onAction: function () {
                    //         toggleState = !toggleState;
                    //         editor.insertContent('<p class='toggle-item'>Here\'s some content inserted from a toggle menu!</p>');
                    //     },
                    //     onSetup: function (api) {
                    //         api.setActive(toggleState);
                    //         return function () { };
                    //     }
                    // });
                }
            };

            functionLoadScript('https://cdnjs.cloudflare.com/ajax/libs/tinymce/5.10.5/tinymce.min.js').then(() => {
                tinymce.init(tinyMCEOptions);

                let formClicker = 0;
                postEditorOptions.form.addEventListener('submit', (event) => {
                    event.preventDefault();

                    let contentReplace = {
                        '"': '"',
                        mcetoc: 'elcreative_toc'
                    };

                    event = tinymce.get('post_contents').getContent().replace(/"|mcetoc/g, function (result) {
                        return contentReplace[result];
                    });

                    if (postEditorOptions.updatePost) {
                        updateDoc(reference, {
                            title: postEditorOptions.form.titles.value,
                            label: postEditorOptions.form.label.value,
                            status: postEditorOptions.form.status.value,
                            content: decodeURI(event),
                            updatedAt: serverTimestamp(),
                            description: postEditorOptions.form.description.value,
                        }).then(() => {
                            window.location.href = `?post-view=${dashboardUrl[2] ? `${postEditorOptions.docID}=${dashboardUrl[2]}` : postEditorOptions.docID}`
                        })
                    } else {
                        ++formClicker;
                        if (formClicker == 1) {
                            addDoc(reference, {
                                title: postEditorOptions.form.titles.value,
                                label: postEditorOptions.form.label.value,
                                author: postEditorOptions.data.displayName,
                                authorUID: postEditorOptions.data.uid,
                                status: postEditorOptions.form.status.value,
                                content: decodeURI(event),
                                createdAt: serverTimestamp(),
                                updatedAt: serverTimestamp(),
                                description: postEditorOptions.form.description.value,
                            }).then(() => {
                                postEditorOptions.form.reset();
                                window.location.href = dashboardPage
                            });
                        } else {
                            window.location.reload()
                        }
                    }
                })
            })
        }

        const postDelete = (postID, userUID) => {
            if (confirm(options.text.textConfirm)) {
                deleteDoc(doc(firestoreDatabase, `users/${userUID}/posts/${postID}`)).then(() => {
                    window.location.href = dashboardPage
                }).catch((error) => {
                    console.log(error)
                })
            }
        };

        const postList = (referenceCollPost, postListOptions) => {
            const subsPostListUser = onSnapshot(referenceCollPost, (coll) => {
                let templates = '';
                coll.docs.forEach((colls) => {
                    const collsData = colls.data();
                    const postID = colls.id;
                    const postTitle = collsData.title;
                    const postAuthor = collsData.author;
                    const postCreatedAt = formatDate(collsData.createdAt);
                    const postDescription = collsData.description;
                    const postStatus = collsData.status;

                    templates += `
                        <div class='relative mb-3 flex w-full flex-col items-start justify-center border-b border-colorBorder pb-3 last:mb-0 last:border-b-0 last:pb-0 dark:border-colorColorModeDarkBorder border-solid border-t-0 border-x-0'>
                            <a href='?post-view=${postID}' class='mb-1 w-full text-colorText hover:text-colorKey ltr:pr-9 rtl:pl-9 dark:text-colorColorModeDarkText dark:hover:text-colorColorModeDarkKey'><span class='w-full font-bold'>${postTitle}</span></a>
        
                            <div class='flex mb-1 w-full flex-row flex-wrap items-center justify-start text-sm text-colorMeta dark:text-colorColorModeDarkMeta'>
                                <span class='notranslate flex flex-row items-center justify-center'><strong>${postAuthor}</strong></span>
                                <span class='flex flex-row items-center justify-center before:mx-1 before:content-[var(--contentBullet)]'><time class='flex flex-row items-center justify-center'>${postCreatedAt}</time></span>
                            </div>
        
                            <div class='relative block w-full text-ellipsis text-[13px] leading-5 text-colorMeta line-clamp-2 dark:text-colorColorModeDarkMeta'>${postDescription}</div>
        
                            ${postStatus == 'post_guest' ? `<div class='mt-2 rounded-full bg-colorBorder py-[2px] px-2 text-xs leading-normal text-colorColorModeDarkBackground dark:bg-colorColorModeDarkBorder dark:text-colorBackground'>Waiting for Review</div>` : ''}
        
                            <button class='elcreative_button_icon elcreative_ripple absolute top-0 ltr:right-0 rtl:left-0' aria-label='More' title='More' aria-expanded='false' aria-haspopup='listbox' data-toggle-class-on-target='active'  data-toggle-target='#dropdown_auth_post_${postID}' data-toggle-escape data-toggle-outside><svg width='18' height='18' viewBox='0 0 24 24' fill='currentColor'>${options.icons.iconMoreVertical}</svg></button>
        
                            <div id='dropdown_auth_post_${postID}' class='elcreative_dropdown dropdown_auth_post_${postID} top-0 z-40 ltr:right-0 ltr:origin-top-right rtl:left-0 rtl:origin-top-left' data-toggle-state='true'>
                                <a href='?post-view=${postID}' class='dropdown_item elcreative_ripple relative flex w-full cursor-pointer select-none appearance-none items-center justify-start py-2 px-4 text-sm text-colorMeta no-underline hover:bg-colorTextTrans1 focus:bg-colorTextTrans1 active:bg-colorTextTrans2 dark:text-colorColorModeDarkMeta dark:hover:bg-colorColorModeDarkTextTrans1 dark:focus:bg-colorColorModeDarkTextTrans1 dark:active:bg-colorColorModeDarkTextTrans2>${options.text.textViewPost}</a>
                                <a href='?post-edit=${postID}' class='dropdown_item elcreative_ripple relative flex w-full cursor-pointer select-none appearance-none items-center justify-start py-2 px-4 text-sm text-colorMeta no-underline hover:bg-colorTextTrans1 focus:bg-colorTextTrans1 active:bg-colorTextTrans2 dark:text-colorColorModeDarkMeta dark:hover:bg-colorColorModeDarkTextTrans1 dark:focus:bg-colorColorModeDarkTextTrans1 dark:active:bg-colorColorModeDarkTextTrans2'>${options.text.textEditPost}</a>
                                <button data-post-id='${postID}' class='dropdown_item button_delete_post relative flex w-full cursor-pointer select-none appearance-none items-center justify-start py-2 px-4 text-sm text-colorMeta no-underline hover:bg-colorTextTrans1 focus:bg-colorTextTrans1 active:bg-colorTextTrans2 dark:text-colorColorModeDarkMeta dark:hover:bg-colorColorModeDarkTextTrans1 dark:focus:bg-colorColorModeDarkTextTrans1 dark:active:bg-colorColorModeDarkTextTrans2' data-toggle-trigger-off>${options.text.textDeletePost}</button>
                            </div>
                        </div>
                    `
                });

                postListOptions.container.innerHTML += templates != '' ? `${templates}<div class='flex items-center justify-center flex-row w-full'><button id='next_data' class='elcreative_button elcreative_ripple relative w-full' type='button' aria-label='${options.text.textLoadMore}'>${options.text.textLoadMore}</button></div>` : `<p class='my-3 noresult text-sm text-center'>${options.text.textNoResult}</p>`;

                const buttonPostDelete = postListOptions.container.querySelectorAll('.button_delete_post');
                buttonPostDelete && buttonPostDelete.forEach((element, index) => {
                    element.addEventListener('click', (event) => {
                        event.preventDefault();

                        postDelete(element.getAttribute('data-post-id'), postListOptions.userUID);
                    }, false)
                });

                const collLength = coll.docs[coll.docs.length - 1] != undefined ? coll.docs[coll.docs.length - 1] : null;
                const buttonLoadMore = postListOptions.container.querySelector('#next_data');
                buttonLoadMore && buttonLoadMore.addEventListener('click', (event) => {
                    event.preventDefault();

                    postList(query(postListOptions.referenceCollPost, orderBy('createdAt', 'desc'), startAfter(collLength), limit(options.limitPostList)), {
                        container: postListOptions.container,
                        referenceCollPost: postListOptions.referenceCollPost,
                        userUID: postListOptions.userUID,
                    });

                    buttonLoadMore.remove()
                })

                !coll.metadata.hasPendingWrites && subsPostListUser();
                window.easyToggleState();
            })
        };

        const postListAll = (referenceCollPostAll, postListAllOptions) => {
            const subsPostListAll = onSnapshot(referenceCollPostAll, (doc) => {
                let templates = '';
                doc.docs.forEach((collUsers) => {
                    const collsData = collUsers.data();
                    const postID = collUsers.id;
                    const postTitle = collsData.title;
                    const postAuthor = collsData.author;
                    const postCreatedAt = formatDate(collsData.createdAt);
                    const postDescription = collsData.description;
                    const postStatus = collsData.status;
                    const authorUID = collsData.authorUID;

                    templates += `
                        <div class='relative mb-3 flex w-full flex-col items-start justify-center border-b border-colorBorder pb-3 last:mb-0 last:border-b-0 last:pb-0 dark:border-colorColorModeDarkBorder border-solid border-t-0 border-x-0'>
                        <a href='?post-view=${postID}=${authorUID}' class='mb-1 w-full text-colorText hover:text-colorKey ltr:pr-9 rtl:pl-9 dark:text-colorColorModeDarkText dark:hover:text-colorColorModeDarkKey'><span class='w-full font-bold'>${postTitle}</span></a>

                        <div class='flex mb-1 w-full flex-row flex-wrap items-center justify-start text-sm text-colorMeta dark:text-colorColorModeDarkMeta'>
                            <span class='notranslate flex flex-row items-center justify-center'><strong>${postAuthor}</strong></span>
                            <span class='flex flex-row items-center justify-center before:mx-1 before:content-[var(--contentBullet)]'><time class='flex flex-row items-center justify-center'>${postCreatedAt}</time></span>
                        </div>

                        <div class='relative block w-full text-ellipsis text-[13px] leading-5 text-colorMeta line-clamp-2 dark:text-colorColorModeDarkMeta'>${postDescription}</div>

                        ${postStatus == 'post_guest' ? `<div class='mt-2 rounded-full bg-colorBorder py-[2px] px-2 text-xs leading-normal text-colorColorModeDarkBackground dark:bg-colorColorModeDarkBorder dark:text-colorBackground'>Waiting for Review</div>` : ''}

                        <button class='elcreative_button_icon elcreative_ripple absolute top-0 ltr:right-0 rtl:left-0' aria-label='More' title='More' aria-expanded='false' aria-haspopup='listbox' data-toggle-class-on-target='active'  data-toggle-target='#dropdown_auth_post_${postID}' data-toggle-escape data-toggle-outside><svg width='18' height='18' viewBox='0 0 24 24' fill='currentColor'>${options.icons.iconMoreVertical}</svg></button>

                        <div id='dropdown_auth_post_${postID}' class='elcreative_dropdown dropdown_auth_post_${postID} top-0 z-40 ltr:right-0 ltr:origin-top-right rtl:left-0 rtl:origin-top-left' data-toggle-state='true'>
                            <a href='?post-view=${postID}=${authorUID}' class='dropdown_item elcreative_ripple relative flex w-full cursor-pointer select-none appearance-none items-center justify-start py-2 px-4 text-sm text-colorMeta no-underline hover:bg-colorTextTrans1 focus:bg-colorTextTrans1 active:bg-colorTextTrans2 dark:text-colorColorModeDarkMeta dark:hover:bg-colorColorModeDarkTextTrans1 dark:focus:bg-colorColorModeDarkTextTrans1 dark:active:bg-colorColorModeDarkTextTrans2'>${options.text.textViewPost}</a>
                            <a href='?post-edit=${postID}=${authorUID}' class='dropdown_item elcreative_ripple relative flex w-full cursor-pointer select-none appearance-none items-center justify-start py-2 px-4 text-sm text-colorMeta no-underline hover:bg-colorTextTrans1 focus:bg-colorTextTrans1 active:bg-colorTextTrans2 dark:text-colorColorModeDarkMeta dark:hover:bg-colorColorModeDarkTextTrans1 dark:focus:bg-colorColorModeDarkTextTrans1 dark:active:bg-colorColorModeDarkTextTrans2'>${options.text.textEditPost}</a>
                            <button data-post-id='${postID}' data-author-id='${authorUID}' class='dropdown_item button_delete_post relative flex w-full cursor-pointer select-none appearance-none items-center justify-start py-2 px-4 text-sm text-colorMeta no-underline hover:bg-colorTextTrans1 focus:bg-colorTextTrans1 active:bg-colorTextTrans2 dark:text-colorColorModeDarkMeta dark:hover:bg-colorColorModeDarkTextTrans1 dark:focus:bg-colorColorModeDarkTextTrans1 dark:active:bg-colorColorModeDarkTextTrans2' data-toggle-trigger-off>${options.text.textDeletePost}</button>
                        </div>
                    </div>
                    `
                });

                postListAllOptions.containerPost.innerHTML += templates != '' ? `${templates}<div class='flex items-center justify-center flex-row w-full'><button id='next_data' class='elcreative_button elcreative_ripple relative w-full' type='button' aria-label='${options.text.textLoadMore}'>${options.text.textLoadMore}</button></div>` : `<p class='my-3 text-sm noresult text-center'>${options.text.textNoResult}</p>`;

                const buttonPostDelete = postListAllOptions.containerPost.querySelectorAll('.button_delete_post');
                buttonPostDelete && buttonPostDelete.forEach((element, index) => {
                    element.addEventListener('click', (event) => {
                        event.preventDefault();

                        postDelete(element.getAttribute('data-post-id'), element.getAttribute('data-author-id'));
                    }, false)
                });

                const collLength = doc.docs[doc.docs.length - 1] != undefined ? doc.docs[doc.docs.length - 1] : null;
                const buttonLoadMore = postListAllOptions.containerPost.querySelector('#next_data');
                buttonLoadMore && buttonLoadMore.addEventListener('click', (event) => {
                    event.preventDefault();

                    postListAll(query(collectionGroup(firestoreDatabase, 'posts'), where('status', '==', 'post_draft'), startAfter(collLength), limit(options.limitPostList)), {
                        userUID: postListAllOptions.userUID,
                        userRole: postListAllOptions.userRole,
                        containerPost: postListAllOptions.containerPost,
                    });

                    buttonLoadMore.remove()
                })

                !doc.metadata.hasPendingWrites && subsPostListAll();
                window.easyToggleState();
            })
        }

        const postView = (referenceDocPosts, postViewOptions) => {
            const subsPostView = onSnapshot(referenceDocPosts, (doc) => {
                const docID = doc.id;
                const docData = doc.data();

                if (docData != undefined) {
                    const postLabel = docData.label;
                    const postTitle = docData.title;
                    const postDescription = docData.description;
                    const postAuthor = docData.author;
                    const postCreatedAt = formatDate(docData.createdAt);
                    const postContent = docData.content;

                    const templateHeader = `
                        <nav class='mb-2 flex flex-row items-center justify-start text-sm text-colorMeta dark:text-colorColorModeDarkMeta'><a href='${dashboardPage}' title='Dashboard' class='relative text-colorItemMeta dark:text-colorColorModeDarkMeta'>Dashboard</a>${postLabel ? `<span class='mx-2'>/</span><span>${postLabel}</span>` : ''}</nav>

                        <h1 class='mb-2 w-full text-2xl font-bold text-colorText dark:text-colorColorModeDarkText'>${postTitle}</h1>

                        ${postDescription != '' ? `<div class='mb-3 w-full text-[15px] text-colorMeta dark:text-colorColorModeDarkMeta'><em>${postDescription}</em></div>` : ''}

                        <div class='mb-1 flex w-full flex-row flex-wrap items-center justify-between text-sm text-colorMeta dark:text-colorColorModeDarkMeta'>
                            <div class='flex flex-row flex-wrap items-center justify-between'>
                                <div class='flex flex-col flex-wrap items-start justify-between'>
                                    <strong class='notranslate'>${postAuthor}</strong>
                                    <time>${postCreatedAt}</time>
                                </div>
                            </div>
                            <div class='relative flex flex-row flex-wrap items-center justify-between'>
                                <button class='elcreative_button_icon elcreative_ripple' aria-label='More' title='More' aria-expanded='false' aria-haspopup='listbox' data-toggle-class-on-target='active'  data-toggle-target='#dropdown_auth_post_${docID}' data-toggle-escape data-toggle-outside><svg width='18' height='18' viewBox='0 0 24 24' fill='currentColor'>${options.icons.iconMoreVertical}</svg></button>
                                <div id='dropdown_auth_post_${docID}' class='elcreative_dropdown dropdown_auth_post_${docID} top-0 ltr:right-0 ltr:origin-top-right rtl:left-0 rtl:origin-top-left' data-toggle-state='true'>
                                    <a href='?post-edit=${dashboardUrl[2] ? docID + '=' + dashboardUrl[2] : docID}' class='dropdown_item elcreative_ripple relative flex w-full cursor-pointer select-none appearance-none items-center justify-start py-2 px-4 text-sm text-colorMeta no-underline hover:bg-colorTextTrans1 focus:bg-colorTextTrans1 active:bg-colorTextTrans2 dark:text-colorColorModeDarkMeta dark:hover:bg-colorColorModeDarkTextTrans1 dark:focus:bg-colorColorModeDarkTextTrans1 dark:active:bg-colorColorModeDarkTextTrans2' data-toggle-trigger-off>${options.text.textEditPost}</a>
                                    <button id='button_delete_post' class='button_delete_post dropdown_item elcreative_ripple relative flex w-full cursor-pointer select-none appearance-none items-center justify-start py-2 px-4 text-sm text-colorMeta no-underline hover:bg-colorTextTrans1 focus:bg-colorTextTrans1 active:bg-colorTextTrans2 dark:text-colorColorModeDarkMeta dark:hover:bg-colorColorModeDarkTextTrans1 dark:focus:bg-colorColorModeDarkTextTrans1 dark:active:bg-colorColorModeDarkTextTrans2' type='button' aria-label='${options.text.textDeletePost}'>${options.text.textDeletePost}</button>
                                </div>
                            </div>
                        </div>
                    `;

                    options.elements.elementPostHeader.innerHTML = templateHeader;
                    options.elements.elementContainer.innerHTML = postContent;

                    const buttonPostDelete = options.elements.elementPostHeader.querySelector('.button_delete_post');
                    buttonPostDelete && buttonPostDelete.addEventListener('click', () => {
                        postDelete(docID, dashboardUrl[2] ? dashboardUrl[2] : postViewOptions.userUID);
                    }, false);

                    !doc.metadata.fromCache || !doc.metadata.hasPendingWrites && subsPostView();
                    window.easyToggleState();
                } else {
                    window.location.href = dashboardPage
                }
            }, (error) => {
                if (error) window.location.href = dashboardPage
            })
        };

        const postEdit = (referenceDocPosts) => {
            const subsPostEdit = onSnapshot(referenceDocPosts, (doc) => {
                const docID = doc.id;
                const docData = doc.data();
                if (docData != undefined) {
                    const postLabel = docData.label;
                    const postTitle = docData.title;
                    const postDescription = docData.description;
                    const postAuthor = docData.author;
                    const postCreatedAt = formatDate(docData.createdAt);
                    const postContent = docData.content;
                    const postStatus = docData.status;

                    const templates = `
                        <form id='edit_post'>
                            <div class='elcreative_input'>
                                <input id='titles' name='titles' value='${postTitle}' placeholder=' ' type='text' autocomplete='off' required/>
                                <label for='titles'>${options.text.textPostTitle}</label>
                            </div>
                            <div class='elcreative_input'>
                                <textarea id='description' name='description' cols='15' placeholder=' ' autocomplete='off' resize='horizontal' rows='3' maxlength='150' required>${postDescription}</textarea>
                                <label for='label'>${options.text.textPostDescription}</label>
                            </div>
                            <div class='elcreative_input'>
                                <input id='label' name='label' value='${postLabel}' placeholder=' ' type='text' autocomplete='off'/>
                                <label for='label'>${options.text.textPostLabel}</label>
                            </div>
                            <div class='elcreative_input'>
                                <select id='status' name='status' class='bg-colorBackground dark:bg-colorColorModeDarkBackground'>
                                    <option value='post_draft' ${postStatus == 'post_draft' ? 'selected' : ''}>${options.text.textSavePostPrivate}</option>
                                    <option value='post_guest' ${postStatus == 'post_guest' ? 'selected' : ''} disabled>${options.text.textSavePostGuest}</option>
                                    <option value='post_private' ${postStatus == 'post_private' ? 'selected' : ''} disabled>${options.text.textSavePostToMyBlog}</option>
                                    <option value='post_public' ${postStatus == 'post_public' ? 'selected' : ''} disabled>${options.text.textSavePostPublic}</option>
                                </select>
                                <label for='status'>${options.text.textSaveOptions}</label>
                            </div>
                            <textarea id='post_contents' class='' name='post_contents' resize='horizontal'>${postContent}</textarea>
                            <div class='flex flex-row items-center justify-end mt-4'>
                                <a class='elcreative_button elcreative_ripple ltr:mr-2 rtl:ml-2' href='${dashboardPage}'>${options.text.textCancel}</a>
                                <button class='elcreative_button elcreative_ripple raised' aria-label='${options.text.textSave}'>${options.text.textSave}</button>
                            </div>
                        </form>
                    `
                    options.elements.elementPostTitle.innerHTML = options.text.textEditPost;
                    options.elements.elementContainer.innerHTML = templates;

                    const forms = document.getElementById('edit_post');
                    postEditor(referenceDocPosts, {
                        form: forms,
                        updatePost: true,
                        docID: docID,
                    })
                } else {
                    window.location.href = dashboardPage
                }

                !doc.metadata.hasPendingWrites && subsPostEdit();
            }, (error) => {
                if (error) window.location.href = dashboardPage
            })
        };

        const postAdd = (referenceCollPost, postAddOptions) => {
            const templates = `
                <form id='edit_post'>
                    <div class='elcreative_input'>
                        <input id='titles' name='titles' placeholder=' ' type='text' autocomplete='off' required/>
                        <label for='titles'>${options.text.textPostTitle}</label>
                    </div>
                    <div class='elcreative_input'>
                        <textarea id='description' name='description' cols='15' placeholder=' ' autocomplete='off' resize='horizontal' rows='3' maxlength='150' required></textarea>
                        <label for='label'>${options.text.textPostDescription}</label>
                    </div>
                    <div class='elcreative_input'>
                        <input id='label' name='label' placeholder=' ' type='text' autocomplete='off'/>
                        <label for='label'>${options.text.textPostLabel}</label>
                    </div>
                    <div class='elcreative_input'>
                        <select id='status' name='status' class='bg-colorBackground dark:bg-colorColorModeDarkBackground'>
                            <option value='post_draft'>${options.text.textSavePostPrivate}</option>
                            <option value='post_guest' disabled>${options.text.textSavePostGuest}</option>
                            <option value='post_private' disabled>${options.text.textSavePostToMyBlog}</option>
                            <option value='post_public' disabled>${options.text.textSavePostPublic}</option>
                        </select>
                        <label for='status'>${options.text.textSaveOptions}</label>
                    </div>
                    <textarea id='post_contents' class='' name='post_contents' resize='horizontal'></textarea>
                    <div class='flex flex-row items-center justify-end mt-4'>
                        <a class='elcreative_button elcreative_ripple ltr:mr-2 rtl:ml-2' href='${dashboardPage}'>${options.text.textCancel}</a>
                        <button class='elcreative_button elcreative_ripple raised' aria-label='${options.text.textSave}'>${options.text.textSave}</button>
                    </div>
                </form>
            `
            options.elements.elementPostTitle.innerHTML = options.text.textCreateNewPost;
            options.elements.elementContainer.innerHTML = templates;

            const forms = document.getElementById('edit_post');
            postEditor(referenceCollPost, {
                form: forms,
                updatePost: false,
                data: postAddOptions.data
            })
        };

        const userView = (userID, userViewOptions) => {
            const subsUserView = onSnapshot(doc(firestoreDatabase, `users/${userID}`), (doc) => {
                const docID = doc.id;
                const docData = doc.data();
                const userPhotoUrl = docData.userPhotoUrl;
                const userDisplayName = docData.userDisplayName;
                const userCustomDisplayName = docData.userCustomDisplayName;
                const userPublic = docData.userPublic;
                const userRole = docData.userRole;
                const userCustomWebURL = docData.userCustomWebURL;
                const userEmail = docData.userEmail;
                const userCustomPhone = docData.userCustomPhone;
                const userCustomBio = docData.userCustomBio;

                let templates = `
                <div class='flex w-full flex-col items-center justify-center py-4'>
                    <div class='relative h-[100px] w-[100px] flex-shrink-0 flex-grow-0'>
                        <img src='${userPhotoUrl ? userPhotoUrl : options.images.imageUserDefault}' alt='${userCustomDisplayName ? userCustomDisplayName : userDisplayName}' class='h-full w-full rounded-full text-transparent'/>

                        ${userRole ? (userRole == 'admin' ? `<svg class='absolute bottom-0 rounded-full bg-colorBackground fill-current p-1 text-colorKey ltr:right-0 rtl:left-0 dark:bg-colorColorModeDarkBackgroundAlt dark:text-colorColorModeDarkKey' height='28' viewBox='0 0 24 24' width='28'>${options.icons.iconVerified}</svg>` : '') : ''}
                    </div>
                    <div class='mt-3 flex w-full flex-col items-center justify-center'>
                        <div class='text-lg text-colorText dark:text-colorColorModeDarkText'>
                            <strong>${userCustomDisplayName ? userCustomDisplayName : userDisplayName}</strong>
                        </div>

                        <div class='flex w-full flex-col items-center justify-center text-sm'>
                            ${userCustomWebURL ? `<a href='${userCustomWebURL}' class='text-colorKey hover:underline dark:text-colorColorModeDarkKey' target='_blank' rel='nofollow noopener noreferer'>Website</a>` : ''}

                            ${userViewOptions.userRole == 'admin' ? `<div class='flex w-full flex-row items-center justify-center text-sm'><span>${userEmail}</span>${userCustomPhone ? `<span class='mx-2'>|</span><span>${userCustomPhone}</span>` : ''}</div>` : ''}

                            ${userCustomBio ? `<div class='mt-1 w-full text-center text-sm text-colorMeta dark:text-colorColorModeDarkMeta'>${userCustomBio}</div>` : ''}
                        </div>
                    </div>
                </div>
                `;

                userViewOptions.container.innerHTML = templates
                !doc.metadata.fromCache || !doc.metadata.hasPendingWrites && subsUserView();
            })
        }

        const userList = (referenceCollUser, listAllOptions) => {
            const subsUserListAll = onSnapshot(referenceCollUser, (coll) => {
                let userData = '';
                coll.docs.forEach((colls) => {
                    const collsID = colls.id;
                    const collsData = colls.data();
                    const userPhotoUrl = collsData.userPhotoUrl;
                    const userDisplayName = collsData.userDisplayName;
                    const userCustomDisplayName = collsData.userCustomDisplayName;
                    const userPublic = collsData.userPublic;
                    const userRole = collsData.userRole;

                    userData += `
                        <div class='relative flex w-full flex-col items-center justify-center py-2'>
                            <div class='relative h-16 w-16 flex-shrink-0 flex-grow-0'>
                                ${listAllOptions.userRole == 'admin' ? `<img src='${userPhotoUrl ? userPhotoUrl : options.images.imageUserDefault}' alt='${userCustomDisplayName ? userCustomDisplayName : userDisplayName}' class='h-full w-full rounded-full text-transparent'/>` : `<img src='${userPublic == "true" ? userPhotoUrl ? userPhotoUrl : options.imageUserDefault : options.images.imageUserDefault}' alt='${userPublic == "true" ? (userCustomDisplayName ? userCustomDisplayName : userDisplayName) : "Private User"}' class='h-full w-full rounded-full text-transparent'/>`}

                                ${listAllOptions.userRole == 'admin' ? `<svg class='absolute bottom-0 rounded-full bg-colorBackground text-colorKey ltr:right-0 rtl:left-0 dark:bg-colorColorModeDarkBackground dark:text-colorColorModeDarkKey' height='18' viewBox='0 0 24 24' width='18' title='Administrator' fill='currentColor'>${options.icons.iconVerified}</svg>` : userPublic == "true" ? (userRole == 'admin' ? `<svg class='absolute bottom-0 rounded-full bg-colorBackground text-colorKey ltr:right-0 rtl:left-0 dark:bg-colorColorModeDarkBackground dark:text-colorColorModeDarkKey' height='18' viewBox='0 0 24 24' width='18' title='Administrator' fill='currentColor'>${options.icons.iconVerified}</svg>` : '') : ''}
                            </div>
                            <div class='mt-2 text-center font-medium leading-5 text-colorText dark:text-colorColorModeDarkText'>
                                ${listAllOptions.userRole == 'admin' ? (userCustomDisplayName ? userCustomDisplayName : userDisplayName) : (userPublic == "true" ? (userCustomDisplayName ? userCustomDisplayName : userDisplayName) : "Private User")}
                            </div>
                            ${listAllOptions.userRole == 'admin' ? `<button data-user-id='${collsID}' class='button_view_users inline-flex flex-row items-center justify-center text-xs text-colorKey dark:text-colorColorModeDarkKey border-0 outline-0 bg-transparent cursor-pointer' type='button' data-toggle-target='#dialog_users' data-toggle-class-on-target='active' data-toggle-escape data-toggle-outside>${userPublic == 'false' ? `<svg fill='currentColor' height='12' viewBox='0 0 24 24' width='12' title='Private User' class='ltr:mr-1 rtl:ml-1' title='Private User'>${options.icons.iconLock}</svg>` : ''}<span>${options.text.textViewProfile}</span></button>` : (userPublic == 'true' ? `<button data-user-id='${collsID}' class='button_view_users inline-flex flex-row items-center justify-center text-xs text-colorKey dark:text-colorColorModeDarkKey' type='button' data-toggle-target='#dialog_users' data-toggle-class-on-target='active' data-toggle-escape data-toggle-outside>${options.text.textViewProfile}</button>` : `<span class="text-xs text-colorMeta dark:text-colorColorModeDarkMeta">${options.text.textHiddenProfile}</span>`)}

                            ${listAllOptions.userRole == 'admin' ? `<button class='elcreative_button_icon elcreative_ripple absolute top-0 ltr:right-0 rtl:left-0' aria-label='More' title='More' aria-expanded='false' aria-haspopup='listbox' data-toggle-class-on-target='active' data-toggle-target='#dropdown_set_remove_admin_${collsID}' data-toggle-escape data-toggle-outside><svg width='14' height='14' viewBox='0 0 24 24' fill='currentColor'>${options.icons.iconMoreVertical}</svg></button>
        
                            <div id='dropdown_set_remove_admin_${collsID}' class='elcreative_dropdown top-0 z-40 ltr:right-0 ltr:origin-top-right rtl:left-0 rtl:origin-top-left' data-toggle-state='true'>
                                <button data-user-id='${collsID}' data-user-role='${userRole}' class='dropdown_set_remove_admin dropdown_item button_delete_post text-colorMeta hover:bg-colorTextTrans1 focus:bg-colorTextTrans1 active:bg-colorTextTrans2 dark:text-colorColorModeDarkMeta dark:hover:bg-colorColorModeDarkTextTrans1 dark:focus:bg-colorColorModeDarkTextTrans1 dark:active:bg-colorColorModeDarkTextTrans2' data-toggle-trigger-off>${userRole != 'admin' ? options.text.textSetAdmin : options.text.textSetUser}</button>
                            </div>` : ''}
                        </div>
                    `;
                });

                listAllOptions.containerUser.innerHTML += userData != '' ? `${userData}<button id='next_data' class='elcreative_button elcreative_ripple col-span-2 mt-3 lg:col-span-3' type='button' aria-label='${options.text.textLoadMore}'>${options.text.textLoadMore}</button>` : `<p class='my-3 noresult text-center text-sm col-span-2 lg:col-span-3'>${options.text.textNoResult}</p>`;

                const collLength = coll.docs[coll.docs.length - 1] != undefined ? coll.docs[coll.docs.length - 1] : null;
                const buttonLoadMore = listAllOptions.containerUser.querySelector('#next_data');
                buttonLoadMore && buttonLoadMore.addEventListener('click', (event) => {
                    event.preventDefault();

                    userList(query(collection(firestoreDatabase, 'users'), orderBy('userLastSigned', 'desc'), startAfter(collLength), limit(options.limitUserList)), {
                        userUID: listAllOptions.userUID,
                        userRole: listAllOptions.userRole,
                        containerUser: listAllOptions.containerUser,
                    });

                    buttonLoadMore.remove()
                    window.easyToggleState();
                });

                const buttonViewUsers = listAllOptions.containerUser.querySelectorAll('.button_view_users');
                const dialogUserContent = document.querySelector('.dialog_users .dialog_container .dialog_content');
                buttonViewUsers && buttonViewUsers.forEach((element, index) => {
                    element.addEventListener('click', () => {
                        dialogUserContent.innerHTML = options.elements.elementLoader;

                        userView(element.getAttribute('data-user-id'), {
                            container: dialogUserContent,
                            userRole: listAllOptions.userRole,
                        });
                    }, false);
                });

                const buttonSetRemoveAdmin = listAllOptions.containerUser.querySelectorAll('.dropdown_set_remove_admin');
                buttonSetRemoveAdmin && buttonSetRemoveAdmin.forEach((element, index) => {
                    element.addEventListener('click', () => {
                        const userRef = doc(firestoreDatabase, `users/${element.getAttribute('data-user-id')}`);
                        if (confirm(options.text.textConfirm)) {
                            if (element.getAttribute('data-user-role') == 'admin') {
                                updateDoc(userRef, {
                                    userRole: 'user'
                                });
                            } else {
                                updateDoc(userRef, {
                                    userRole: 'admin'
                                });
                            };

                            window.location.reload()
                        } else {
                            return false
                        }
                    }, false);
                });

                !coll.metadata.hasPendingWrites && subsUserListAll();
                window.easyToggleState();
            })
        };

        const userProfile = (referenceDocUser, userProfileOptions) => {
            const subsCurrentUser = onSnapshot(referenceDocUser, (doc) => {
                const userData = doc.data();
                const userPhotoUrl = userData.userPhotoUrl;
                const userDisplayName = userData.userCustomDisplayName ? userData.userCustomDisplayName : userData.displayName
                const userRole = userData.userRole;
                const userWebURL = userData.userCustomWebURL;
                const userBio = userData.userCustomBio
                const userPhone = userData.userCustomPhone;
                const userPublic = userData.userPublic;

                const templates = `
                    <div class='relative flex w-full flex-col items-center justify-center rounded-lg border border-solid border-colorBorder p-3 dark:border-colorColorModeDarkBorder'>
                        <div class='flex w-full flex-col items-center justify-center lg:flex-row'>
                            <div class='relative h-[100px] w-[100px] flex-shrink-0 flex-grow-0'>
                                <img src='${userPhotoUrl ? userPhotoUrl : options.images.imageUserDefault}' alt='${userDisplayName}' title='${userDisplayName}' class='h-full w-full rounded-full text-transparent'/>
                                ${userRole ? (userRole == 'admin' ? `<svg class='absolute bottom-0 rounded-full bg-colorBackground fill-current p-1 text-colorKey ltr:right-0 rtl:left-0 dark:bg-colorColorModeDarkBackground dark:text-colorColorModeDarkKey' height='28' viewBox='0 0 24 24' width='28' title='Admin'>${options.icons.iconVerified}</svg>` : '') : ''}
                            </div>
                            <div class='mt-3 flex w-full flex-col items-center justify-center lg:mt-0 lg:items-start ltr:lg:ml-4 rtl:lg:mr-4'>
                                <div class='text-lg text-colorText dark:text-colorColorModeDarkText'>
                                    <strong>${userDisplayName}</strong>
                                </div>
                                <div class='flex w-full flex-row items-center justify-center text-sm lg:justify-start'>
                                    ${userWebURL != '' ? `<a href='${userWebURL}' class='text-colorKey hover:underline dark:text-colorColorModeDarkKey' target='_blank' rel='nofollow noopener noreferer'>Website</a>` : ''}
                                </div>
                                ${userBio != '' ? `<div class='mt-1 w-full text-center text-sm text-colorMeta dark:text-colorColorModeDarkMeta lg:text-start'>${userBio}</div>` : ''}
                            </div>
                        </div>
                    
                        <button class='elcreative_button_icon elcreative_ripple absolute top-3 ltr:right-3 rtl:left-3' aria-label='More' title='More' aria-expanded='false' aria-haspopup='listbox' data-toggle-class-on-target='active' data-toggle-target='#dropdown_auth_profile_more' data-toggle-escape data-toggle-outside><svg width='20' height='20' viewBox='0 0 24 24'>${options.icons.iconSettings}</svg></button>

                        <div id='dropdown_auth_profile_more' class='elcreative_dropdown dropdown_auth_profile_more top-3 ltr:right-3 ltr:origin-top-right rtl:left-3 rtl:origin-top-left' data-toggle-state='true'>
                            <button class='dropdown_item elcreative_ripple text-colorMeta hover:bg-colorTextTrans1 focus:bg-colorTextTrans1 active:bg-colorTextTrans2 dark:text-colorColorModeDarkMeta dark:hover:bg-colorColorModeDarkTextTrans1 dark:focus:bg-colorColorModeDarkTextTrans1 dark:active:bg-colorColorModeDarkTextTrans2' data-toggle-target='#dialog_profile' data-toggle-class-on-target='active' data-toggle-escape data-toggle-outside data-toggle-trigger-off>${options.text.textEditProfile}</button>
                            <button id='button_auth_signout' class='dropdown_item elcreative_ripple text-colorMeta hover:bg-colorTextTrans1 focus:bg-colorTextTrans1 active:bg-colorTextTrans2 dark:text-colorColorModeDarkMeta dark:hover:bg-colorColorModeDarkTextTrans1 dark:focus:bg-colorColorModeDarkTextTrans1 dark:active:bg-colorColorModeDarkTextTrans2'>${options.text.textSignOut}</button>
                        </div>
                    </div>

                    <div class='mt-4 flex w-full flex-col items-center justify-around gap-3 lg:flex-row'>
                        <a href='?post-add' class='elcreative_button elcreative_ripple outlined w-full' rel='noopener'>${options.text.textCreateNewPost}</a>
                    </div>

                    <div id='tabs_profile' class='elcreative_tabs mt-4 rounded-lg border border-solid border-colorBorder bg-colorBackground shadow-none dark:border-colorColorModeDarkBorder dark:bg-colorColorModeDarkBackground'>
                        <div class='tab_buttons'>
                            <button class='tab_button elcreative_ripple' type='button' data-toggle-target='#tab_posts' data-toggle-radio-group='tab_group_1' data-toggle-class data-toggle-is-active><span>${options.text.textMyPosts}</span></button>
                            ${userRole == 'admin' ? `<button id='tab_button_posts_all' class='tab_button elcreative_ripple' type='button' data-toggle-target='#tab_posts_all' data-toggle-radio-group='tab_group_1' data-toggle-class><span>${options.text.textAllPost}</span></button>` : ''}
                            <button id='tab_button_users' class='tab_button elcreative_ripple' type='button' data-toggle-target='#tab_users' data-toggle-radio-group='tab_group_1' data-toggle-class><span>${options.text.textUsers}</span></button>
                        </div>
                        <div class='tab_contents'>
                            <div class='tab_content' id='tab_posts'>${options.elements.elementLoader}</div>
                            ${userRole == 'admin' ? `<div class='tab_content' id='tab_posts_all'>${options.elements.elementLoader}</div>` : ''}
                            <div id='tab_users' class='tab_content users_list_container grid h-0 w-full grid-cols-2 gap-2 lg:grid-cols-3'>${options.elements.elementLoader}</div>
                        </div>
                    </div>

                    <form id='dialog_profile' class='elcreative_dialog dialog_profile'>
                        <div class='dialog_container'>
                            <div class='dialog_header'>
                                <span>${options.text.textEditProfile}</span>
                                <div class='elcreative_button_icon elcreative_ripple' type='button' aria-label='Close' title='Close' data-toggle-trigger-off><svg width='24' height='24' viewBox='0 0 24 24' fill='currentColor'>${options.icons.iconClose}</svg></div>
                            </div>
                            <div class='dialog_content'>
                                <div class='elcreative_input'>
                                    <input id='names' name='names' value='${userDisplayName}' placeholder=' ' type='text' autocomplete='off'/>
                                    <label for='name'>${options.text.textName}</label>
                                </div>
                                <div class='elcreative_input'>
                                    <textarea id='bio' name='bio' placeholder=' ' maxlength='150' autocomplete='off'>${userBio ? userBio : ''}</textarea>
                                    <label for='bio'>${options.text.textBio}</label>
                                </div>
                                <div class='elcreative_input'>
                                    <input id='web' name='web' value='${userWebURL ? userWebURL : ''}' placeholder=' ' type='url' autocomplete='off'/>
                                    <label for='web'>${options.text.textWebURL}</label>
                                </div>
                                <div class='elcreative_input'>
                                    <input id='phone' name='phone' value='${userPhone ? userPhone : ''}' placeholder=' ' type='number' autocomplete='off'/>
                                    <label for='phone'>${options.text.textPhone}</label>
                                </div>
                                <div class='elcreative_input'>
                                    <select id='visibility' name='visibility' class='bg-colorBackground dark:bg-colorColorModeDarkBackgroundAlt'>
                                        <option value='false' ${userPublic ? (userPublic == 'false' ? 'selected' : '') : ''}>${options.text.textProfilePrivate}</option>
                                        <option value='true' ${userPublic ? (userPublic == 'true' ? 'selected' : '') : ''}>${options.text.textProfilePublic}</option>
                                    </select>
                                    <label for='visibility'>${options.text.textProfileVisibility}</label>
                                </div>
                                <div class='mt-2 flex w-full flex-row items-center justify-end'>
                                    <button id='button_profile_save' class='elcreative_button elcreative_ripple raised'>${options.text.textSave}</button>
                                </div>
                            </div>
                        </div>
                    </form>

                    <div id='dialog_users' class='elcreative_dialog dialog_users'><div class='dialog_container'><div class='dialog_content'>${options.elements.elementLoader}</div></div></div>
                `;

                // Injecting templates and remove container element
                options.elements.elementContainer.innerHTML = templates;

                // Check user Profile Visibility, if empty then profile will be visible to public
                updateDoc(referenceDocUser, {
                    userPublic: userPublic ? userPublic : 'true'
                });

                // Form Action
                const forms = options.elements.elementContainer.querySelector('#dialog_profile');
                forms.addEventListener('submit', (event) => {
                    event.preventDefault();

                    // Updating user profile
                    updateDoc(referenceDocUser, {
                        userCustomDisplayName: forms.names.value,
                        userCustomBio: forms.bio.value,
                        userCustomWebURL: forms.web.value,
                        userCustomPhone: forms.phone.value,
                        userPublic: forms.visibility.value,
                    });

                    window.location.reload()
                });

                // Tabs
                const tabs = options.elements.elementContainer.querySelector('#tabs_profile');
                const tabsPost = tabs.querySelector('#tab_posts');
                postList(query(userProfileOptions.referenceCollPost, orderBy('createdAt', 'desc'), limit(options.limitPostList)), {
                    container: tabsPost,
                    referenceCollPost: userProfileOptions.referenceCollPost,
                    userUID: doc.id,
                });
                tabsPost.innerHTML = '';

                const buttonTabsPostAll = tabs.querySelector('#tab_button_posts_all');
                const tabsPostsAll = tabs.querySelector('#tab_posts_all');
                let tabsPostsAllClicker = 0;
                userRole == 'admin' && buttonTabsPostAll.addEventListener('click', () => {
                    ++tabsPostsAllClicker;
                    if (tabsPostsAllClicker == 1) {
                        tabsPostsAll.innerHTML = '';
                        postListAll(query(collectionGroup(firestoreDatabase, 'posts'), where('status', '==', 'post_draft'), limit(options.limitPostList)), {
                            userUID: doc.id,
                            userRole: userRole,
                            containerPost: tabsPostsAll,
                        });
                    }
                })

                const buttonTabsUser = tabs.querySelector('#tab_button_users');
                const tabsUsers = tabs.querySelector('#tab_users');
                let tabUserClicker = 0;
                buttonTabsUser.addEventListener('click', () => {
                    ++tabUserClicker;
                    if (tabUserClicker == 1) {
                        tabsUsers.innerHTML = '';
                        userList(query(collection(firestoreDatabase, 'users'), orderBy('userLastSigned', 'desc'), limit(options.limitUserList)), {
                            userUID: doc.id,
                            userRole: userRole,
                            containerUser: tabsUsers,
                        });
                    }
                });

                // Sign Out
                const buttonSignOut = options.elements.elementContainer.querySelector('#button_auth_signout');
                buttonSignOut.addEventListener('click', (event) => {
                    event.preventDefault();

                    signOut(firebaseAuth).then(() => {
                        localStorage.removeItem('auth_image');
                        window.location.href = '/';
                    }).catch((error) => {

                    })
                });

                !doc.metadata.hasPendingWrites && subsCurrentUser();
                window.easyToggleState();
            });
        };

        const signIn = (container, signInOptions) => {
            let templates = `
                <div class="flex w-full flex-col items-center justify-center rounded-lg border border-solid border-colorBorder py-3 px-3 dark:border-colorColorModeDarkBorder">
                    <img src='${document.querySelector("link[rel^='icon']").getAttribute('href')}' class='mb-2 rounded-full shadow-2dp p-3' />
                    <div class="mb-2 text-2xl font-bold">Welcome</div>
                    <div class="mb-3">Please Sign-In to continue</div>
                    <button id='auth_google' class="auth_google elcreative_button elcreative_ripple outlined" type='button' aria-label='Sign in with Google'><svg class='ltr:mr-2 rtl:ml-2' width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z" /></svg><span>Sign in with Google</span></button>
                    <div class="dark:text-colorColorModeDarkMeta mt-3 max-w-lg text-center text-sm text-colorMeta">*Authentication Service will share your name, email address and profile picture.</div>
                </div>
            `

            signInOptions.postHeader.remove()
            container.innerHTML = templates;
            container.querySelector('.auth_google').addEventListener('click', (event) => {
                event.preventDefault();

                const authProviderGoogle = new GoogleAuthProvider;
                signInWithRedirect(firebaseAuth, authProviderGoogle).then(() => {
                    window.location.href = dashboardUrl;
                }).catch((error) => {
                    window.location.href = '/';
                })
            })
        }

        onAuthStateChanged(firebaseAuth, (currentUser) => {
            if (currentUser) {
                setDoc(doc(firestoreDatabase, 'users', currentUser.uid), {
                    userDisplayName: currentUser.displayName,
                    userEmail: currentUser.email,
                    userUID: currentUser.uid,
                    userPhotoUrl: currentUser.photoURL,
                    userJoined: currentUser.metadata.creationTime,
                    userLastSigned: currentUser.metadata.lastSignInTime,
                }, {
                    merge: true
                }).then(() => {
                    localStorage.setItem('auth_image', currentUser.photoURL);

                    const referenceDocUser = doc(firestoreDatabase, `users/${currentUser.uid}`);
                    const referenceDocPosts = dashboardUrl[1] != '' ? doc(firestoreDatabase, `users/${dashboardUrl[2] ? dashboardUrl[2] : currentUser.uid}/posts/${dashboardUrl[1]}`) : '';
                    const referenceCollPost = collection(firestoreDatabase, `users/${currentUser.uid}/posts`);

                    if (dashboardUrl[0] == 'post-view' && dashboardUrl[1] != '') {
                        postView(referenceDocPosts, {
                            userUID: dashboardUrl[2] ? dashboardUrl[2] : currentUser.uid
                        })
                    } else if (dashboardUrl[0] == 'post-edit' && dashboardUrl[1] != '') {
                        postEdit(referenceDocPosts, {
                            userUID: currentUser.uid
                        })
                    } else if (dashboardUrl[0] == 'post-add') {
                        postAdd(referenceCollPost, {
                            userUID: currentUser.uid,
                            data: currentUser
                        });
                    } else {
                        userProfile(referenceDocUser, {
                            referenceCollPost: referenceCollPost
                        });

                        // MATERIA X2
                        options.elements.elementContainer.classList.remove('post_body')
                    }
                })
            } else {
                localStorage.removeItem('auth_image');

                signIn(options.elements.elementContainer, {
                    postHeader: options.elements.elementPostHeader
                });

                // MATERIA X2
                options.elements.elementContainer.classList.remove('post_body')
            }
        })
    }
})(authPageIndex, {
    getConfig: firebaseConfig,
    limitPostList: 4,
    limitUserList: 6,
    elements: {
        elementContainer: elementPostBody,
        elementPostHeader: document.querySelector('.post-header'),
        elementPostTitle: document.querySelector('.entry-title'),
        elementLoader: elcreativeConfig.include.iconLoader,
    },
    images: {
        imageUserDefault: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhPzZlVciGeYVCgCEcfFKeNI8IhtFHNShFG_5Xavi8bej56zOpPRIjHEUZsTsLybpnEZkNJ6M-ivL0lcjLs9YEu_xVrD14a9gtcfxBAzIvwrmAY920GO9gkHtlljlwvRnLcRvD8WL5pbEcmgxCpct-7EJsMymUnpFCMxpTk8i0b0P7O82_kzKoEjeb3/w80/user-icon.webp',
    },
    text: {
        textBio: elcreativeConfig.with.translateBio,
        textCreateNewPost: elcreativeConfig.with.translateCreateNewPost,
        textEditProfile: elcreativeConfig.with.translateEditProfile,
        textMyPosts: elcreativeConfig.with.translateMyPosts,
        textName: elcreativeConfig.with.translateName,
        textPhone: elcreativeConfig.with.translatePhone,
        textProfileVisibility: elcreativeConfig.with.translateProfileVisibility,
        textProfilePrivate: elcreativeConfig.with.translateProfilePrivate,
        textProfilePublic: 'Terlihat untuk publik',
        textSignOut: elcreativeConfig.with.translateSignOut,
        textSave: elcreativeConfig.with.translateSave,
        textWebURL: elcreativeConfig.with.translateWebURL,
        textViewPost: elcreativeConfig.with.translateViewPost,
        textEditPost: elcreativeConfig.with.translateEditPost,
        textDeletePost: elcreativeConfig.with.translateDeletePost,
        textLoadMore: elcreativeConfig.with.translateLoadMore,
        textNoResult: elcreativeConfig.dataMessages.noResultsFound,
        textConfirm: elcreativeConfig.with.translateConfirm,
        textPostTitle: elcreativeConfig.with.translatePostTitle,
        textPostDescription: elcreativeConfig.with.translatePostDescription,
        textPostLabel: elcreativeConfig.with.translatePostLabel,
        textSaveOptions: elcreativeConfig.with.translateSaveOptions,
        textSavePostPrivate: elcreativeConfig.with.translateSavePostPrivate,
        textSavePostGuest: elcreativeConfig.with.translateSavePostGuest,
        textSavePostToMyBlog: elcreativeConfig.with.translateSavePostMyBlog,
        textSavePostPublic: elcreativeConfig.with.translateSavePostPublic,
        textCancel: elcreativeConfig.with.translateCancel,
        textAllPost: elcreativeConfig.with.translateAllPosts,
        textUsers: elcreativeConfig.with.translateUsers,
        textViewProfile: elcreativeConfig.with.translateViewProfile,
        textHiddenProfile: elcreativeConfig.with.translateHiddenProfile,
        textSetAdmin: elcreativeConfig.with.translateSetAdmin,
        textSetUser: elcreativeConfig.with.translateSetUser,
    },
    icons: {
        iconVerified: elcreativeConfig.include.iconVerified,
        iconSettings: elcreativeConfig.include.iconSettings,
        iconClose: elcreativeConfig.include.iconClose,
        iconMoreVertical: elcreativeConfig.include.iconMoreVertical,
        iconLock: elcreativeConfig.include.iconLock,
    }
})