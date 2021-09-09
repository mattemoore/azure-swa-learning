<script>
    import { onMount } from "svelte";
    import twttr from "twitter-text";
    import { insert } from "underscore.string";

    let postContent = "";
    let postContentTransformed = "";
    let hashTagSearchString = "";
    let maxTweetLength = 280;
    let isPostButtonDisabled = true;

    async function handleSubmit(event) {
        const response = await fetch("./api/Tweet/", {
            method: 'POST', 
            cache: 'no-cache', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({status: postContentTransformed}) 
        });
        let responseText = await response.text();
        alert(responseText); 
    }

    async function searchHashTag() {
        const response = await fetch("./api/Trends/", {
            method: 'GET', 
            cache: 'no-cache', 
            headers: {
                'Content-Type': 'application/json'
            }
        });
        let responseText = await response.text();
        alert(responseText); 
    }

    async function transformPost(event) {
        let newHTML = postContent;
        if (hasReachedTweetLimit(postContent)) {
            newHTML = insert(newHTML, maxTweetLength, "&#128721;");
        }
        postContentTransformed = newHTML;
        isPostValid();
    }

    function hasReachedTweetLimit(postContent) {
        let parsedTweet = twttr.parseTweet(postContent);
        return parsedTweet.weightedLength > maxTweetLength;
    }

    function isPostValid() {
        let isValid = postContent.length > 0;
        isPostButtonDisabled = !isValid;
    }

    function cheatCode(callback) {
        var input = "";
        var key = "lorem";
        document.addEventListener("keyup", function (e) {
            input += "" + e.key;
            if (input === key) {
                return callback();
            }
            if (!key.indexOf(input)) return;
            input = "" + e.key;
        });
    }

    cheatCode(function () {
        postContent =
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
        transformPost();
    });
</script>

<div class="container">
    <div class="text-center text-lg-start">
        <h1 class="display-4 fw-bold lh-1 mb-3">
            Post to all your social media accounts with one click
        </h1>
        <p class="col-lg-10 fs-4">
            Easily create compelling content and post it to all of your social
            media accounts with one click
        </p>
    </div>
    <div>
        <form
            class="p-4 p-md-5 border rounded-3 bg-light"
            on:submit|preventDefault={handleSubmit}
            on:invalid={transformPost}
            on:changed={transformPost}
            on:input={transformPost}
        >
            <div class="mb-3">
                <label for="postContent">Post content</label>
                <textarea
                    rows="6"
                    class="form-control"
                    id="postContent"
                    placeholder="Type your post content here..."
                    spellcheck="true"
                    bind:value={postContent}
                />
            </div>
            <div class="row">
                <div class="col">
                    <input
                        type="search"
                        class="form-control"
                        id="hashtagSearch"
                        placeholder="Search for trending hashtags..."
                        bind:value={hashTagSearchString}
                    />
                </div>
                <div class="col">
                    <button
                        type="button"
                        class="btn btn-primary"
                        on:click={searchHashTag}>Search</button
                    >
                </div>
            </div>
            <div class="mb-3" id="postPreviewContainer">
                <label for="postPreview">Post preview</label>
                <div
                    id="postPreview"
                    contenteditable="fakse"
                    bind:innerHTML={postContentTransformed}
                    style="min-height:9em; overflow-wrap:break-word"
                />
            </div>
            <button
                class="w-100 btn btn-lg btn-primary"
                type="submit"
                disabled={isPostButtonDisabled}>Post</button
            >
        </form>
    </div>
</div>

<style>
</style>
