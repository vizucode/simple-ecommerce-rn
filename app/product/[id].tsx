import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
    Dimensions,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const { width } = Dimensions.get("window");

// Sample product data (same as catalog)
const PRODUCTS = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 1299000,
        rating: 4.8,
        reviews: 128,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
        category: "Electronics",
        isNew: true,
        description:
            "Experience premium sound quality with our wireless headphones. Featuring advanced noise cancellation, 30-hour battery life, and ultra-comfortable ear cushions. Perfect for music lovers and professionals alike.",
        features: [
            "Active Noise Cancellation",
            "30-hour battery life",
            "Bluetooth 5.0",
            "Premium leather cushions",
            "Foldable design",
        ],
        colors: ["#1a1a2e", "#e94560", "#f5f5f5"],
    },
    {
        id: 2,
        name: "Smart Watch Pro",
        price: 2499000,
        rating: 4.9,
        reviews: 256,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
        category: "Electronics",
        isNew: false,
        description:
            "Stay connected and track your fitness with our premium Smart Watch Pro. Features heart rate monitoring, GPS tracking, and a stunning AMOLED display that's visible even in bright sunlight.",
        features: [
            "AMOLED Display",
            "Heart Rate Monitor",
            "GPS Tracking",
            "Water Resistant 50m",
            "7-day battery life",
        ],
        colors: ["#1a1a2e", "#c0c0c0", "#ffd700"],
    },
    {
        id: 3,
        name: "Premium Sneakers",
        price: 1899000,
        rating: 4.7,
        reviews: 89,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
        category: "Fashion",
        isNew: true,
        description:
            "Step up your style with these premium sneakers. Crafted with genuine leather and advanced cushioning technology for all-day comfort. Perfect for both casual and athletic wear.",
        features: [
            "Genuine Leather Upper",
            "Memory Foam Insole",
            "Non-slip Rubber Sole",
            "Breathable Design",
            "Lightweight Construction",
        ],
        colors: ["#e94560", "#1a1a2e", "#ffffff"],
    },
    {
        id: 4,
        name: "Leather Backpack",
        price: 899000,
        rating: 4.6,
        reviews: 67,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
        category: "Fashion",
        isNew: false,
        description:
            "A perfect blend of style and functionality. This premium leather backpack features multiple compartments, padded laptop sleeve, and water-resistant coating. Ideal for work, travel, or everyday use.",
        features: [
            "Genuine Leather",
            "Padded Laptop Sleeve (15\")",
            "Water Resistant",
            "Multiple Compartments",
            "Adjustable Straps",
        ],
        colors: ["#8b4513", "#1a1a2e", "#d2691e"],
    },
    {
        id: 5,
        name: "Minimal Desk Lamp",
        price: 459000,
        rating: 4.5,
        reviews: 45,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600",
        category: "Home",
        isNew: false,
        description:
            "Illuminate your workspace with this elegant minimal desk lamp. Features adjustable brightness, warm to cool color temperature, and a sleek modern design that complements any desk setup.",
        features: [
            "Adjustable Brightness",
            "3 Color Temperatures",
            "USB Charging Port",
            "Touch Control",
            "Energy Efficient LED",
        ],
        colors: ["#ffffff", "#1a1a2e", "#ffd700"],
    },
    {
        id: 6,
        name: "Coffee Maker",
        price: 1599000,
        rating: 4.8,
        reviews: 112,
        image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=600",
        category: "Home",
        isNew: true,
        description:
            "Brew barista-quality coffee at home with our premium coffee maker. Features 15-bar pressure, built-in grinder, and milk frother for the perfect cappuccino or latte every time.",
        features: [
            "15-bar Pressure System",
            "Built-in Grinder",
            "Milk Frother",
            "Programmable Timer",
            "Easy Clean System",
        ],
        colors: ["#c0c0c0", "#1a1a2e", "#e94560"],
    },
];

const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(price);
};

export default function ProductDetailScreen() {
    const { id } = useLocalSearchParams();
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);

    const product = PRODUCTS.find((p) => p.id === Number(id));

    if (!product) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Product not found</Text>
            </View>
        );
    }

    const incrementQuantity = () => setQuantity((q) => q + 1);
    const decrementQuantity = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.headerButton}
                    onPress={() => router.back()}
                >
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.headerButton}
                    onPress={() => setIsFavorite(!isFavorite)}
                >
                    <Ionicons
                        name={isFavorite ? "heart" : "heart-outline"}
                        size={24}
                        color={isFavorite ? "#e94560" : "#fff"}
                    />
                </TouchableOpacity>
            </View>

            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentContainer}
            >
                {/* Product Image */}
                <View style={styles.imageContainer}>
                    <Image source={{ uri: product.image }} style={styles.productImage} />
                    {product.isNew && (
                        <View style={styles.newBadge}>
                            <Text style={styles.newBadgeText}>NEW</Text>
                        </View>
                    )}
                </View>

                {/* Product Info */}
                <View style={styles.infoContainer}>
                    <View style={styles.categoryRow}>
                        <Text style={styles.category}>{product.category}</Text>
                        <View style={styles.ratingContainer}>
                            <Ionicons name="star" size={16} color="#FFD700" />
                            <Text style={styles.ratingText}>{product.rating}</Text>
                            <Text style={styles.reviewsText}>({product.reviews} reviews)</Text>
                        </View>
                    </View>

                    <Text style={styles.productName}>{product.name}</Text>
                    <Text style={styles.productPrice}>{formatPrice(product.price)}</Text>

                    {/* Description */}
                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.description}>{product.description}</Text>

                    {/* Colors */}
                    <Text style={styles.sectionTitle}>Colors</Text>
                    <View style={styles.colorsContainer}>
                        {product.colors.map((color, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.colorButton,
                                    { backgroundColor: color },
                                    selectedColor === index && styles.colorButtonSelected,
                                ]}
                                onPress={() => setSelectedColor(index)}
                            >
                                {selectedColor === index && (
                                    <Ionicons
                                        name="checkmark"
                                        size={16}
                                        color={color === "#ffffff" || color === "#f5f5f5" ? "#1a1a2e" : "#fff"}
                                    />
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Features */}
                    <Text style={styles.sectionTitle}>Features</Text>
                    <View style={styles.featuresContainer}>
                        {product.features.map((feature, index) => (
                            <View key={index} style={styles.featureItem}>
                                <Ionicons name="checkmark-circle" size={20} color="#e94560" />
                                <Text style={styles.featureText}>{feature}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Quantity */}
                    <Text style={styles.sectionTitle}>Quantity</Text>
                    <View style={styles.quantityContainer}>
                        <TouchableOpacity
                            style={styles.quantityButton}
                            onPress={decrementQuantity}
                        >
                            <Ionicons name="remove" size={20} color="#fff" />
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{quantity}</Text>
                        <TouchableOpacity
                            style={styles.quantityButton}
                            onPress={incrementQuantity}
                        >
                            <Ionicons name="add" size={20} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Action Bar */}
            <View style={styles.bottomBar}>
                <View style={styles.totalContainer}>
                    <Text style={styles.totalLabel}>Total Price</Text>
                    <Text style={styles.totalPrice}>
                        {formatPrice(product.price * quantity)}
                    </Text>
                </View>
                <TouchableOpacity style={styles.addToCartBtn} activeOpacity={0.8}>
                    <LinearGradient
                        colors={["#e94560", "#c73659"]}
                        style={styles.addToCartGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Ionicons
                            name="bag-add"
                            size={20}
                            color="#fff"
                            style={styles.cartIcon}
                        />
                        <Text style={styles.addToCartText}>Add to Cart</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0f0f1a",
    },
    header: {
        position: "absolute",
        top: 50,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        zIndex: 10,
    },
    headerButton: {
        width: 44,
        height: 44,
        borderRadius: 14,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        flex: 1,
    },
    contentContainer: {
        paddingBottom: 120,
    },
    imageContainer: {
        width: width,
        height: width * 0.9,
        backgroundColor: "#1a1a2e",
        position: "relative",
    },
    productImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    newBadge: {
        position: "absolute",
        bottom: 20,
        left: 20,
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 10,
        backgroundColor: "#e94560",
    },
    newBadgeText: {
        fontSize: 12,
        fontWeight: "700",
        color: "#fff",
        letterSpacing: 0.5,
    },
    infoContainer: {
        padding: 24,
        backgroundColor: "#0f0f1a",
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        marginTop: -32,
    },
    categoryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    category: {
        fontSize: 13,
        color: "#8b8b9e",
        textTransform: "uppercase",
        letterSpacing: 1,
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    ratingText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#fff",
        marginLeft: 6,
    },
    reviewsText: {
        fontSize: 13,
        color: "#8b8b9e",
        marginLeft: 4,
    },
    productName: {
        fontSize: 28,
        fontWeight: "700",
        color: "#fff",
        letterSpacing: 0.3,
        marginBottom: 8,
    },
    productPrice: {
        fontSize: 24,
        fontWeight: "700",
        color: "#e94560",
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 17,
        fontWeight: "600",
        color: "#fff",
        marginBottom: 12,
        marginTop: 8,
    },
    description: {
        fontSize: 15,
        color: "#8b8b9e",
        lineHeight: 24,
        marginBottom: 16,
    },
    colorsContainer: {
        flexDirection: "row",
        gap: 12,
        marginBottom: 16,
    },
    colorButton: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "transparent",
    },
    colorButtonSelected: {
        borderColor: "#e94560",
    },
    featuresContainer: {
        marginBottom: 16,
    },
    featureItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    featureText: {
        fontSize: 15,
        color: "#fff",
        marginLeft: 12,
    },
    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    quantityButton: {
        width: 44,
        height: 44,
        borderRadius: 14,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        justifyContent: "center",
        alignItems: "center",
    },
    quantityText: {
        fontSize: 20,
        fontWeight: "600",
        color: "#fff",
        marginHorizontal: 24,
        minWidth: 30,
        textAlign: "center",
    },
    bottomBar: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 16,
        paddingBottom: 32,
        backgroundColor: "#16213e",
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 10,
    },
    totalContainer: {
        flex: 1,
    },
    totalLabel: {
        fontSize: 13,
        color: "#8b8b9e",
        marginBottom: 4,
    },
    totalPrice: {
        fontSize: 22,
        fontWeight: "700",
        color: "#fff",
    },
    addToCartBtn: {
        flex: 1.2,
        height: 54,
        borderRadius: 16,
        overflow: "hidden",
        shadowColor: "#e94560",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.35,
        shadowRadius: 12,
        elevation: 6,
    },
    addToCartGradient: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    cartIcon: {
        marginRight: 8,
    },
    addToCartText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#fff",
        letterSpacing: 0.3,
    },
    errorText: {
        fontSize: 18,
        color: "#fff",
        textAlign: "center",
        marginTop: 100,
    },
});
