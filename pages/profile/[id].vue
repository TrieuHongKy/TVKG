<template>
  <div>
    <div name="profile" class="profile__pages--info">
      <div class="profile__pages--layout">
        <div class="rounded-xl">
          <div class="">
            <template v-if="isLoading">
              <lazy-profile-information-loading />
            </template>
            <template v-else>
              <lazy-profile-information
                :infor="profile?.user"
                :address-data="profile?.address"
                :is-owner-profile="isOwnerProfile"
                @update-information="updateProfileData"
              ></lazy-profile-information>
              <!-- @public-profile="togglePublicProfile" -->
            </template>
          </div>
          <div class="profile__pages--working mt-4">
            <div class="md:w-1/3 flex-0 flex-col">
              <!-- <profile-working-time
                :work-time="user?.workingTime"
                :public="publicProfile.public"
              ></profile-working-time> -->
              <!-- <profile-language :show-lang="profile?.showLanguages" :public="publicProfile.public"></profile-language> -->
              <div class="">
                <template v-if="isLoading"><lazy-profile-language-loading /></template>
                <template v-else>
                  <lazy-profile-language
                    :languages-data="profile?.languages"
                    :is-owner-profile="isOwnerProfile"
                  ></lazy-profile-language>
                </template>
              </div>
              <div class="mt-4">
                <template v-if="isLoading"><lazy-profile-education-loading /></template>
                <template v-else>
                  <lazy-profile-education
                    :educations="profile?.educations"
                    :is-owner-profile="isOwnerProfile"
                    @update-education="updateEducation"
                  ></lazy-profile-education>
                </template>
              </div>
            </div>
            <div class="md:w-2/3">
              <div>
                <template v-if="isLoading"><lazy-profile-resume-loading /></template>
                <template v-else>
                  <lazy-profile-resume
                    :resume-data="profile?.resume"
                    :is-owner-profile="isOwnerProfile"
                    @update-resume="updateResume"
                  ></lazy-profile-resume>
                </template>
              </div>
              <!-- <profile-work-history
                :work-history="user?.workHistory"
                :public="publicProfile.public"
                ></profile-work-history> -->
              <div class="mt-4">
                <template v-if="isLoading"><lazy-profile-skill-loading /></template>
                <template v-else>
                  <lazy-profile-skill
                    :skill-data="profile?.skills"
                    :is-owner-profile="isOwnerProfile"
                    @update-skills="updateSkill"
                  ></lazy-profile-skill>
                </template>
              </div>
              <!-- <profile-certification
                :certification="user?.certifications"
                :public="publicProfile.public"
              ></profile-certification> -->
            </div>
          </div>
        </div>
        <!-- <profile-certification
          :certification="user?.certifications"
          :public="publicProfile.public"
        ></profile-certification> -->
        <!-- <profile-experience :experience="profile?.otherExperience" :public="publicProfile.public"></profile-experience> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type {User} from 'next-auth'
import {defineComponent} from 'vue'
import {useProfileStore} from '~/stores/profile'
import type {Education, Resume} from '~/types/profile'
import type {Skill} from '~/types/skill'

export default defineComponent({
  name: 'ProfilePublic',
  setup() {
    definePageMeta({
      title: 'Hồ sơ ứng viên',
      description: 'Hồ sơ ứng viên'
      // middleware: 'auth'
    })

    const toast = useToast()

    const { id } = useRoute().params

    const profileStore = useProfileStore()
    const authStore = useAuthStore()
    const { getCandidateById, updateProfile, updateInfo } = profileStore
    // const profile = ref<Profile | null>(null)
    const { profile } = storeToRefs(profileStore)

    const isLoading = ref(true)

    const { user } = storeToRefs(authStore)
    const isOwnerProfile = computed(
      () => user.value?.id === profile.value?.user?.id || user.value?.id === (profile.value?.user as any)?.google_id
    )
    onMounted(async () => {
      await getCandidateById(id as any)
      await getProfileData()
    })

    const updateProfileData = async (data: User) => {
      await updateInfo(id as any, data as any)
    }

    const getProfileData = async () => {
      await getCandidateById(id as any)
      // profile.value = profileStore.profile
      isLoading.value = false
    }

    const updateEducation = async (data: Array<Education>) => {
      const req: object = {
        user_id: profile.value?.user?.id,
        educations: data.map((e: Education) => e.id)
      }
      await updateProfile(id as any, req as any)
    }

    const updateResume = async (resume: Resume) => {
      const req: object = {
        user_id: profile.value?.user.id,
        resume_id: resume.id
      }
      await updateProfile(id as any, req as any)
    }

    const updateSkill = async (skills: Array<Skill>) => {
      const req: object = {
        user_id: profile.value?.user.id,
        skills: skills.map((e: Skill) => e.id)
      }
      const status = await updateProfile(id as any, req as any)

      if (status) {
        toast.add({
          title: 'Cập nhật kỹ năng thành công',
          icon: status ? 'i-heroicons-check-circle-solid' : 'i-heroicons-x-circle-solid',
          timeout: 2000
        })
      }
    }

    // const togglePublicProfile = (value: boolean) => {
    //   publicProfile.public = value
    // }

    return {
      id,
      profile,
      isLoading,
      isOwnerProfile,
      updateProfileData,
      updateEducation,
      // togglePublicProfile,
      updateResume,
      updateSkill
    }
  }
})
</script>

<style scope>
.profile__pages--info {
  @apply mx-auto justify-center items-center flex p-2;
}
.profile__pages--layout {
  @apply w-full;
}
.profile__pages--working {
  @apply flex flex-col md:flex-row gap-4;
}
</style>
