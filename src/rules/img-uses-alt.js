import React from 'react'
import {
  devices
, hiddenFromAT
} from '../util'

// test will be run in order
export default [
  {
    tagName: 'img'
  , msg: 'The img does not have an `alt` prop, screen-readers will not know what it is'
  , url: 'https://dev.w3.org/html5/alt-techniques'
  , test (tagName, props) {
      const hidden = hiddenFromAT(props)
      const alt    = typeof props.alt !== 'string'

      return !hidden && !alt
    }
  , affects: [
      devices.screenReaders
    ]
  },

  {
    tagName: 'img'
  , msg: 'The `alt` prop cannot be empty string if role="presentation" is not set.'
  , url: 'https://www.w3.org/TR/wai-aria/roles#presentation'
  , test (tagName, props) {
      const hidden = hiddenFromAT(props)
      const alt    = typeof props.alt === 'string'
      const empty  = alt && props.alt === ''
      const pres   = props.role === 'presentation'

      return !hidden && alt && empty && pres
    }
  , affects: [
      devices.screenReaders
    ]
  }
]

export const pass = [
  {
    when: 'the img has an `alt`'
  , render() { return <img src='foo' alt='nice' /> }
  }
, {
    when: 'the img has an empty `alt` and role="presentation"'
  , render() { return <img src='foo' alt='' role='presentation'/> }
  }
, {
    when: 'the img is aria-hidden'
  , render() { return <img src='foo' aria-hidden /> }
  }
]

export const fail = [
  {
    when: 'the img doen\'t have an `alt`'
  , render: () => <img src='foo' />
  }
, {
    when: 'the img has alt="" but no role="presentation"'
  , render: () => <img src='foo' alt='' />
  }
]

export const description = `
This is nice --
`
