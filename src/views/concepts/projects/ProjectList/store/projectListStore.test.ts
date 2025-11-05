import { describe, it, beforeEach, expect } from 'vitest'
import { useProjectListStore } from './projectListStore'
import type { Project } from '../types'

function makeProject(overrides: Partial<Project> = {}): Project {
  return {
    id: Math.random().toString(36).slice(2),
    name: 'Demo Project',
    category: [],
    desc: 'desc',
    totalTask: 0,
    completedTask: 0,
    progression: 0,
    companySize: 'S',
    notes: '',
    picName: 'PIC',
    picRole: [],
    currentSystem: [],
    systemRequirement: [],
    budget: 0,
    meetingDate: new Date(),
    isMeetingStage: false,
    ...overrides,
  }
}

beforeEach(() => {
  useProjectListStore.setState({ projectList: [], newProjectDialog: false }, true)
})

describe('useProjectListStore', () => {
  it('initializes with empty list', () => {
    const state = useProjectListStore.getState()
    expect(state.projectList).toEqual([])
    expect(state.newProjectDialog).toBe(false)
  })

  it('setProjectList replaces the list with an array', () => {
    const a = makeProject({ id: 'a' })
    const b = makeProject({ id: 'b' })
    useProjectListStore.getState().setProjectList([a, b])
    expect(useProjectListStore.getState().projectList).toEqual([a, b])
  })

  it('setProjectList supports functional updater', () => {
    const a = makeProject({ id: 'a' })
    const b = makeProject({ id: 'b' })
    useProjectListStore.getState().setProjectList([a])
    useProjectListStore.getState().setProjectList(prev => prev.concat(b))
    expect(useProjectListStore.getState().projectList.map(p => p.id)).toEqual(['a', 'b'])
  })

  it('updateProjectList appends a project', () => {
    const a = makeProject({ id: 'a' })
    useProjectListStore.getState().setProjectList([a])
    const b = makeProject({ id: 'b' })
    useProjectListStore.getState().updateProjectList(b)
    const ids = useProjectListStore.getState().projectList.map(p => p.id)
    expect(ids).toEqual(['a', 'b'])
  })

  it('updateProjectFavorite toggles favourite for matching id', () => {
    const a = makeProject({ id: 'a', favourite: false })
    const b = makeProject({ id: 'b', favourite: false })
    useProjectListStore.getState().setProjectList([a, b])
    useProjectListStore.getState().updateProjectFavorite({ id: 'b', value: true })
    const list = useProjectListStore.getState().projectList
    const favA = list.find(p => p.id === 'a')!.favourite
    const favB = list.find(p => p.id === 'b')!.favourite
    expect(favA).toBe(false)
    expect(favB).toBe(true)
  })
})

