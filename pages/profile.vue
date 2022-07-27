<template>
    <div class="my-container">
        <div class="content">
            <div class="page-content">
                <div class="form-content">
                    <div class="input-panel">
                        <ValidationObserver ref="form">
                            <!-- First name -->
                            <div class="form-input">
                                <InputWithTitle>
                                <template #title>First name</template>
                                <template #input>
                                    <CustomInput
                                    v-model="profileInput.firstName"
                                    type="text"
                                    rules="required"
                                    />
                                </template>
                                </InputWithTitle>
                            </div>

                            <!-- Last name -->
                            <div class="form-input">
                                <InputWithTitle>
                                <template #title>Last name</template>

                                <template #input>
                                    <CustomInput
                                    v-model="profileInput.lastName"
                                    type="text"
                                    />
                                </template>
                                </InputWithTitle>
                            </div>

                            <!-- Email -->
                            <div class="form-input">
                            <InputWithTitle>
                            <template #title>Email</template>

                            <template #input>
                                <CustomInput
                                v-model="profileInput.email"
                                vid="email"
                                type="email"
                                rules="email|required"
                                />
                            </template>
                            </InputWithTitle>
                            </div>

                            <!-- Password -->
                            <div class="form-input">
                                <InputWithTitle>
                                <template #title>Password</template>

                                <template #input>
                                    <CustomInput
                                    v-model="profileInput.password"
                                    type="password"
                                    />
                                </template>
                                </InputWithTitle>
                            </div>

                            <!-- Confirm : Password -->
                            <div class="form-input">
                                <InputWithTitle>
                                <template #title>Confirm : Password</template>

                                <template #input>
                                    <CustomInput
                                    v-model="profileInput.confirmPassword"
                                    type="password"
                                    />
                                </template>
                                </InputWithTitle>
                            </div>
                            <div v-if="profileInput.password != ''" :class="'password-match ' + (isPasswordConfirmed ? 'match' : 'notMatch')">
                                {{ isPasswordConfirmed ? 'Match confirmed!' : 'Need to confirm with the same password.' }}
                            </div>
                        </ValidationObserver>
                    </div>
                    <div class='action-panel'>
                        <DefaultButton button-color-gamma="red" padding="7px 12px" @event="saveProfile"> Save </DefaultButton>
                        <DefaultButton button-color-gamma="white" padding="7px 12px" @event="reset"> Reset </DefaultButton>
                    </div>
                </div>
                <div class="avatar-panel">
                    <!-- Avatar -->
                    <ProfileAvatar :avatar="profileInput.avatarResource" @changed="onAvatarChange">
                    </ProfileAvatar>
                </div>
            </div>
            
            <FormSubmissionMessage
                v-if="showMessage"
                :type="messageType"
                :message="message"
            />

        </div>
    </div>
</template>

<script>
import { ValidationObserver } from 'vee-validate'

import { submitMessagesMixin } from '~/mixins/submitMessagesMixin'
import { errorHandlerMixin } from '~/mixins/errorHandlerMixin'
import { mutationMixin } from '~/mixins/mutationMixin'
import UpdateProfile from '~/graphql/mutations/profile/updateProfile.mutation.gql'
import Me from '~/graphql/queries/me.query.gql'

import ProfileAvatar from '~/components/profile/ProfileAvatar.vue'
import InputWithTitle from '~/components/InputWithTitle.vue'
import CustomInput from '~/components/CustomInput.vue'
import DefaultButton from '~/components/DefaultButton.vue'

export default {
    name: 'LoginPage',
    components: {
        ValidationObserver,
        ProfileAvatar,
        InputWithTitle,
        CustomInput,
        DefaultButton,
    },
    mixins: [submitMessagesMixin, errorHandlerMixin, mutationMixin],
    apollo: {
    },
    layout: 'profile',
    data() {
        return {
            me: {},
            avatarResource: '',
            profileInput: {
                avatar: '',
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: '',
            },
        }
    },
    computed: {
        isPasswordConfirmed() {
            return this.profileInput.password === this.profileInput.confirmPassword
        }
    },
    beforeMount(){
        this.fetchData();
    },
    methods: {
        fetchData() {
            this.me = {};
            this.getMyData().then((me) => {
                this.me = me;
                console.log(me.avatar);
                this.profileInput = {
                    avatarResource: me.avatar != null ? process.env.BASE_URL + me.avatar : '',
                    avatar: null,
                    firstName: me.firstName,
                    lastName: me.lastName,
                    email: me.email,
                    password: '',
                    confirmPassword: '',
                }
            });
        },
        async getMyData() {
            const me = await this.$apollo.query({
                query: Me,
                fetchPolicy: 'network-only'
            });
            return me.data.me;
        },
        onAvatarChange({avatarInput, avatarResource}) {
            this.profileInput.avatar = avatarInput.files[0]
            this.profileInput.avatarResource = avatarResource
        },
        async saveProfile() {
            console.log({
                avatar: this.profileInput.avatar,
                firstName: this.profileInput.firstName,
                lastName: this.profileInput.lastName,
                email: this.profileInput.email,
                password: this.profileInput.password,
            });
            if ( this.isPasswordConfirmed ) {
                const res = await this.mutationAction(
                    UpdateProfile,
                    {
                        profileInput: {
                            avatar: this.profileInput.avatar,
                            firstName: this.profileInput.firstName,
                            lastName: this.profileInput.lastName,
                            email: this.profileInput.email,
                            password: this.profileInput.password,
                        }
                    },
                    null,
                    'Updated Successfully',
                    'Error Occurred',
                    null,
                    true
                )
                console.log(res);
                this.fetchData();
            }
        },
        reset() {
            this.profileInput = {
                avatarResource: this.me.avatar != null ? process.env.BASE_URL + this.me.avatar : '',
                avatar: null,
                firstName: this.me.firstName,
                lastName: this.me.lastName,
                email: this.me.email,
                password: '',
                confirmPassword: '',
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.my-container {
    width: 100%;
    height: calc(100% - 109px);

    .content {
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        align-items: center;
        overflow: hidden;

        .page-content {
            width: 100%;
            overflow: auto;
            display: flex;
            padding: 2rem 0px;
        }
        .form-content {
            width: 60%;
            display: flex;
            flex-direction: column;
            align-items: center;

            .input-panel {
                .form-input {
                    height: 90px;
                    .container {
                        width: 240px;
                    }
                }
                .password-match {
                    font-size: 12px;
                    transform: translate(0px, -20px);
                    &.match {
                        color: green;
                    }
                    &.notMatch {
                        color: $brown;
                    }
                }
            }
            .action-panel {
                margin-top: 1rem;
                margin-bottom: 1rem;
                width: 240px;
            }
        }
        .avatar-panel {
            width: 40%;
            display: flex;
            align-items: center;
        }
    }
}
</style>
