import matplotlib.pyplot as plt
import matplotlib.patches as patches

def create_region_card(region_name, full_name, description, color):
    fig, ax = plt.subplots(figsize=(8, 6))
    
    # Create a styled background
    ax.add_patch(patches.Rectangle((0, 0), 1, 1, facecolor=color, alpha=0.2))
    
    # Add olive branch icon or decorative elements
    # (This would be represented symbolically)
    
    # Add text content
    plt.text(0.5, 0.8, region_name, fontsize=24, ha='center', weight='bold')
    plt.text(0.5, 0.7, full_name, fontsize=16, ha='center', style='italic')
    plt.text(0.5, 0.4, description, fontsize=12, ha='center', va='center', 
             wrap=True, multialignment='center')
    
    # Styling
    plt.axis('off')
    plt.tight_layout()
    
    return fig

# Region definitions
regions = {
    "SA": {
        "name": "Southern Apulia",
        "desc": "Robust and flavorful oils from southern Italy's largest olive oil producing region",
        "color": "#ff9999"
    },
    "U": {
        "name": "Umbria",
        "desc": "Premium oils with distinctive fruity and slightly bitter flavor profiles",
        "color": "#99ff99"
    },
    "EL": {
        "name": "Eastern Liguria",
        "desc": "Delicate and mild oils with buttery notes, perfect for light cuisine",
        "color": "#9999ff"
    },
    "WL": {
        "name": "Western Liguria",
        "desc": "Subtle variations of Ligurian oils influenced by unique microclimates",
        "color": "#ffff99"
    },
    "NA": {
        "name": "Northern Apulia",
        "desc": "Distinctive oils reflecting local varieties and traditional processing methods",
        "color": "#ff99ff"
    }
}

# Generate and save images
for code, info in regions.items():
    fig = create_region_card(code, info["name"], info["desc"], info["color"])
    plt.savefig(f'{code}_region_card.png', dpi=300, bbox_inches='tight')
    plt.close()