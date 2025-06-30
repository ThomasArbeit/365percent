export class defaultSetup {
  route = useRoute();
  router = useRouter();
  // isModalRoute = computed(() => {
  //   this.route.name === 'quest-id' && !!this.route.params.id;
  // })

  
  public get isModalRoute() : boolean {
    return this.route.name === 'quest-id' && !!this.route.params.id;
  }
  

  closeModal () {
    this.router.push('/');
  }
}