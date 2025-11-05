import { describe, it, expect } from 'vitest'
import authNavigationConfig from '@/configs/navigation.config/auth.navigation.config'
import { AUTH_PREFIX_PATH } from '@/constants/route.constant'
import {
  NAV_ITEM_TYPE_TITLE,
  NAV_ITEM_TYPE_COLLAPSE,
  NAV_ITEM_TYPE_ITEM,
} from '@/constants/navigation.constant'

type Node = (typeof authNavigationConfig)[number]

const ALLOWED_TYPES = new Set([
  NAV_ITEM_TYPE_TITLE,
  NAV_ITEM_TYPE_COLLAPSE,
  NAV_ITEM_TYPE_ITEM,
])

function validateNode(node: Node) {
  expect(typeof node.key).toBe('string')
  expect(node.key.length).toBeGreaterThan(0)
  expect(ALLOWED_TYPES.has(node.type)).toBe(true)
  expect(Array.isArray(node.authority)).toBe(true)
  // For leaf items, path should be non-empty and start with AUTH prefix
  if (node.type === NAV_ITEM_TYPE_ITEM) {
    expect(typeof node.path).toBe('string')
    expect(node.path.length).toBeGreaterThan(0)
    expect(node.path.startsWith(AUTH_PREFIX_PATH)).toBe(true)
  }
  if (Array.isArray(node.subMenu)) {
    // Ensure sibling keys are unique
    const keys = node.subMenu.map((n) => n.key)
    expect(new Set(keys).size).toBe(keys.length)
    node.subMenu.forEach(validateNode)
  }
}

describe('authNavigationConfig', () => {
  it('is a non-empty tree', () => {
    expect(Array.isArray(authNavigationConfig)).toBe(true)
    expect(authNavigationConfig.length).toBeGreaterThan(0)
  })

  it('contains valid nodes and paths', () => {
    authNavigationConfig.forEach(validateNode)
  })
})

