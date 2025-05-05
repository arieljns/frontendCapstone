import { create } from 'zustand'
import type { ProjectList, Project } from '../types'

export type ProjectListState = {
    projectList: ProjectList
    newProjectDialog: boolean
}

type ProjectListAction = {
    setProjectList: (payload: ProjectList) => void
    updateProjectList: (payload: Project) => void
    updateProjectFavorite: (payload: { id: string; value: boolean }) => void
}

const initialState: ProjectListState = {
    projectList: [],
    newProjectDialog: false,
}

export const useProjectListStore = create<ProjectListState & ProjectListAction>(
    (set) => ({
        ...initialState,
        setProjectList: (payload) => {
            console.log('setting the project list', payload)
            set(() => ({ projectList: payload }))
        },
        updateProjectList: (payload) =>
            set((state) => ({
                projectList: [...state.projectList, ...[payload]],
            })),
        updateProjectFavorite: (payload) => {
            set((state) => {
                console.log('updating project favorite', payload)
                const { id, value } = payload
                const newList = state.projectList.map((project) => {
                    if (project.id === id) {
                        project.favourite = value
                    }
                    return project
                })

                return {
                    projectList: [...newList],
                }
            })
        },
    }),
)
