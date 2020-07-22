<template> 
<div class="container">
	<div class="row">
		 <div  v-for="comment in comments" :key="comment.key" class="media comment-box">
            <div  v-if="comment.productId == $route.params.id" class="media-body">
                <h4 class="media-heading">{{ comment.userName }}</h4>
                <p>{{ comment.comment }} </p>
            </div>
        </div>
	</div>
</div>
</template>
<script>
export default {
    props: {
        comments: {
            required: false
        }
    }
}
</script>
<style scoped>
.comment-box {
    margin-top: 30px !important;
}
.comment-box .media-body{
    width: 100%;
}
.comment-box .media-body p {
    border: 1px solid #ddd;
    padding: 10px;
}
.comment-box .media-body .media p {
    margin-bottom: 0;
}
.comment-box .media-heading {
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    padding: 7px 10px;
    position: relative;
    margin-bottom: -1px;
}
.comment-box .media-heading:before {
    content: "";
    width: 12px;
    height: 12px;
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    border-width: 1px 0 0 1px;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
    position: absolute;
    top: 10px;
    left: -6px;
}
</style>