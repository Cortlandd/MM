import React from 'react'
import { Text, View } from 'react-native'
import * as Utils from '@/Config/Utils'
import Svg, { Path } from 'react-native-svg'

interface Props {
  name: string,
  username: string,
  following_count: number,
  follower_count: number,
  join_date: string,
  biography: string,
  verified: boolean,
}

const TwitterFooter = ({...props}: Props) => {

  function convert(n: number) {
    var n_format
    if (n < 1000) {
      n_format = Number(n).toFixed()
    } else if (n < 1000000) {
      // Anything less than a million
      n_format = (Number(n) / 1000).toFixed(1) + 'k'
    } else if (Number(n) < 1000000000) {
      // Anything less than a billion
      n_format = (Number(n) / 1000000).toFixed(1) + 'M'
    } else {
      // At least a billion
      n_format = (Number(n) / 1000000000).toFixed(1) + 'B'
    }
    return n_format
  }


  return (
    <View style={{ justifyContent: 'center', alignSelf: 'center', marginHorizontal: 10 }}>
      <View style={{ marginBottom: 10 }}>
        <View style={{ flexDirection: 'row', alignSelf: 'center', marginBottom: 10 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{props.name} </Text>
          <Text style={{ color: '#1DA1F2', fontSize: 16 }}>@{props.username}</Text>
          {Utils.validateBoolean(props.verified) && (
            <Svg viewBox="0 0 24 24" width={20} fill={'#1DA1F2'} aria-label="Verified account">
              <Path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25a3.606 3.606 0 00-1.336-.25c-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5a.749.749 0 01-1.041.208l-.115-.094-2.415-2.415a.749.749 0 111.06-1.06l1.77 1.767 3.825-5.74a.75.75 0 011.25.833z" />
            </Svg>
          )}
        </View>
        <Text style={{ fontSize: 15, marginBottom: 10, alignSelf: 'center', textAlign: 'center' }}>{props.biography}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', marginBottom: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginRight: 2 }}>
            <Text style={{ fontWeight: 'bold' }}>{props.following_count && convert(props.following_count)} </Text>
            <Text style={{ color: '#657786' }}>Following</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'baseline' }}>
            <Text style={{ fontWeight: 'bold' }}>{props.follower_count && convert(props.follower_count)}</Text>
            <Text style={{ color: '#657786' }}> Followers</Text>
          </View>
        </View>
        <Text style={{ alignSelf: 'center', color: '#657786' }}>{props.join_date ? props.join_date : 'Joined August 2020'}</Text>
      </View>
      <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', opacity: 0.2 }}></View>
    </View>
  )
}

export default TwitterFooter
