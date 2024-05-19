import React, { memo, useEffect, useState, useMemo, useCallback } from 'react'
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native'
import { DataTable, ActivityIndicator, MD2Colors } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome'

interface IData {
  userId: number
  id: number
  title: string
  body?: string
}

const TwoScreen = memo(() => {
  const [page, setPage] = useState(0);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(10);
  const [data, setData] = useState<IData[]>([])
  const [loading, setLoading] = useState(false)

  const fetchingData = useCallback(async () => {
    try {
      setLoading(true)
      await fetch('http://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
        .then(res => {
          setData(res)
          console.log(res)
        })
        .catch(err => console.log(err))
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [setData])

  const onPressDeleteData = useCallback((id: number) => {
    setData(prev => {
      const filterData = prev.filter(data => data.id !== id)
      return filterData
    })
  }, [setData])

  const onPressDeleteKey = useCallback(() => {
    setData(prev => {
      return prev.map(data => {
        const { body, ...rest } = data
        return {...rest}
      })
    })
  }, [setData])

  const from = useMemo(() => page * itemsPerPage, [page, itemsPerPage]);
  const to = useMemo(() => Math.min((page + 1) * itemsPerPage, data.length), [page, itemsPerPage, data]);

  useEffect(() => {
    fetchingData()
  }, [])
  
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={fetchingData} />
      }
    >
      {loading ? (
        <View style={styles.wrapperLoading}>
          <ActivityIndicator animating={true} color={MD2Colors.red800} />
        </View>
      ) : (
        <DataTable style={styles.container}>
          <DataTable.Header style={styles.tableHeader}>
            {data.length > 0 && Object.keys(data[0]).map(key => {
              if (key !== 'userId' && key !== 'id') {
                return <DataTable.Title key={key}>{key}</DataTable.Title>
              }
            })}
          <DataTable.Title numeric>Delete Data</DataTable.Title>
          <DataTable.Title numeric>Delete Key</DataTable.Title>
        </DataTable.Header>

        {data.slice(from, to).map((item) => (
          <DataTable.Row key={item.id}>
            <DataTable.Cell style={{flex: 2}}>{item.title}</DataTable.Cell>
            <DataTable.Cell style={{flex: 3}}>{item.body}</DataTable.Cell>
            <DataTable.Cell>
              <Icon name="trash-o" size={24} onPress={() => onPressDeleteData(item.id)}></Icon>
            </DataTable.Cell>
            <DataTable.Cell>
              <Icon name="key" size={24} onPress={onPressDeleteKey}></Icon>
            </DataTable.Cell>
          </DataTable.Row>
        ))}

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(data.length / itemsPerPage)}
          onPageChange={(page: number) => setPage(page)}
          label={`${from + 1}-${to} of ${data.length}`}
          numberOfItemsPerPageList={[10, 25, 50]}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          showFastPaginationControls
          selectPageDropdownLabel={'Rows per page'}
        />
        </DataTable>
      )}
    </ScrollView>
  )
})

const styles = StyleSheet.create({
  container: { 
    padding: 15, 
  }, 
  tableHeader: { 
    backgroundColor: '#DCDCDC', 
  },
  headerTitle: {
    textAlign: 'left',
  },
  headerActions: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20
  },
  wrapperLoading: {
    flex: 1,
    marginTop: 50 
  }
})

TwoScreen.displayName = 'TwoScreen'

export default TwoScreen
