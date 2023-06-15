interface EditState{

}

export interface TypeTask {
  id: string,
  title: string,
  completed: boolean,
  isEditting: 'true'| 'false' | 'disabled'
}
