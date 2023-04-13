const router = useRouter()
const toHome = () => {
    router.push('/#')
}
const toList = () => {
    router.push('/moreblogs')
}
export default {
    toHome,
    toList
}