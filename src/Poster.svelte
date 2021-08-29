<script>
    let isPostValid = false;
    async function handleSubmit(event) {
        console.log(event);
        console.log(event.target);
        alert("Sucka la minkia");
    }
    async function validatePost(event) {
        console.log(event);
        console.log(event.target);
        isPostValid = true;
    }
</script>

<div class="text-center text-lg-start">
    <h1 class="display-4 fw-bold lh-1 mb-3">
        Post to all your social media accounts with one click
    </h1>
    <p class="col-lg-10 fs-4">
        Easily create compelling content and post it to all of your social media
        accounts with one click
    </p>
</div>
<div>
    <form
        class="p-4 p-md-5 border rounded-3 bg-light"
        on:submit|preventDefault={handleSubmit}
        on:invalid={validatePost}
        on:changed={validatePost}
        on:input={validatePost}
    >
        <div class="mb-3">
            <label for="floatpostContentingInput">Post content</label>
            <textarea
                rows="6"
                class="form-control"
                id="postContent"
                placeholder="Put your text content here..."
            />
        </div>
        <!-- TODO: help users find images and hashtags -->
        <div class="mb-3">
            <label for="hashtags">Hash tags and @mentions</label>
            <textarea
                rows="2" 
                type="textarea"
                class="form-control"
                id="hashtags"
                placeholder="Put your #hashtags and @mentions here..."
            />
        </div>
        <button class="w-100 btn btn-lg btn-primary" type="submit" disabled={!isPostValid}>Post</button>
    </form>
</div>

<style>
</style>
