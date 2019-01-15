<template>
    <div class="gitcards gc-repo-wrap">
        <div class="gc-repo">
            <img class="gc-icon" :src="data['owner']['avatar_url']"  :alt="data['owner']['login'] + ' Avatar'"/>
            <a :href="data['html_url']">
                <span class="gc-reponame">{{ data['full_name'] }}</span>
                <span class="gc-respodesc">{{ data['description'] }}</span>
            </a>
        </div>
        <div class="gc-status">
            <a href="" v-if="data['language']">
                <v-icon small>fas fa-code</v-icon>
                <span> {{ data['language'] }}</span>
            </a>
            <a href="">
                <v-icon small>fas fa-star</v-icon>
                <span> {{ data['stargazers_count'] }}</span>
            </a>
            <a v-if="data['license']" :href="data['license']['url']">
                <v-icon small>fas fa-balance-scale</v-icon>
                <span> {{ data['license']['spdx_id'] }}</span>
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "RepoCard",
        props: {
            data: Object
        }
    }
</script>

<style lang="scss" scoped>
    .gitcards {
        margin: 10px;
        padding: 10px;
        //width: 270px;
        height: 150px;
        border: 1px solid #d8d8d8;
        border-radius: 3px;
        font: 14px/1.5 Helvetica,arial,sans-serif;
        color: #333;
        overflow: hidden;
        box-sizing: border-box;

        p {
            margin: 0;
            padding: 0;
        }

        p, ul li, .gc-repo span {
            //width: 158px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }

        .gc-repo-wrap {
            height:98px;
        }

        .gc-icon {
            display: inline-block;
            width: 12px;
            height: 12px;
            margin-right: 6px;
            fill: #666;
        }

        a {
            text-decoration: none;
            color: #333;
            border: none;

            &:hover {
                color: #2879d0;
            }
        }

        .gc-user {
            position: relative;
            padding-left: 90px;

            a:hover {
                border-bottom:1px dashed #666;
            }
        }

        img {
            position: absolute;
            left: 0;
            top: 0;
            width: 76px;
            height: 76px;
            border-radius: 38px;
        }

        .gc-nickname {
            font-size:16px;
        }

        .gc-login {
            font-size: 12px;
            color: #666;
            padding-left: 6px;
        }

        ul {
            list-style: none;
            margin: 0;
            padding:0;

            li {
                height:20px;
                font-size:14px;
                line-height:18px;
            }
        }

        .gc-status {
            margin-top: 4px;
            padding-top: 4px;
            border-top: 1px solid #f2f2f2;

            a {
                display: inline-block;
                width: 30%;
                text-align: center;
                font-size: 12px;

                &:last-child {
                    width:40%;
                }
            }

            strong {
                display: block;
                font-size: 14px;
            }
        }

        .gc-repo {
            position: relative;
            padding-left: 40px;

            .gc-icon {
                position: absolute;
                left: 0;
                top: 6px;
                width: 32px;
                height: 32px;
            }

            span {
                display: block;
                //width: 208px;
            }
        }

        .gc-reponame {
            font-size: 18px;
        }

        .nodesc {
            .gc-reponame {
                font-size: 18px;
                height: 46px;
                line-height: 46px;
            }
        }

        .gc-repodesc {
            font-size: 13px;
            color: #666;
        }

        .gc-loading {
            position: relative;
            height: 100%;
            width: 100%;

            svg {
                position: absolute;
                left: 50%;
                top: 50%;
                width: 32px;
                height: 32px;
                margin-top: -16px;
                margin-left: -16px;
                animation: breathe 2s ease-in-out infinite;
                -webkit-animation: breathe 2s ease-in-out infinite}
        }
    }

    @keyframes breathe {
        0% { opacity: .2 }
        50% { opacity: 1 }
        100% { opacity: .2 }
    }
    @-webkit-keyframes breathe {
        0% { opacity: .2 }
        50% { opacity: 1 }
        100% { opacity: .2 }
    }
</style>