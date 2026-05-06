
import { StyleSheet } from "react-native";

// STYLES
export const screenStyles = StyleSheet.create({

  // SIVUSTON STYLE
  container: {
    flex: 1,
    backgroundColor: '#F4F7FA',
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },

  // TOMORROW LOCKED SCREEN
  lockedContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F4F7FA",
    padding: 20,
  },

  lockedText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
    fontWeight: "bold",
  },

  // FLATLIST STYLE
  bigCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 4,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,

    flex: 1,
  },

  listRow: {
    flexDirection: 'row',
    justifyContent: "space-evenly",
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    marginVertical: 4,
    borderRadius: 10,
  },

  separator: {
    height: 1,
    backgroundColor: '#eee',
  },

  time: {
    fontSize: 14,
    color: "#666",
  },

  price: {
    fontSize: 14,
    // fontWeight: "bold",
  },

  // YLIN - ALIN - KESKIHINTA
  statsCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    marginVertical: 10,
    elevation: 4,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  statBlock: {
    flex: 1,
    alignItems: 'center',
  },

  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 15,
  },

  averageContainer: {
    alignItems: 'center',
  },

  statTitle: {
    fontSize: 14,
    color: '#666',
  },

  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  averageValue: {
    fontSize: 28,
    fontWeight: 'bold',
  },

  // HINTA NYT - vain today screenellä
  currentPriceCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 22,
    marginVertical: 10,
    alignItems: 'center',
    elevation: 5,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },

  currentLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },

  currentPrice: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});