import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ColorPicker, SelectControl } from '@wordpress/components';

import './style.scss';

import metadata from './block.json';

const ALLOWED_BLOCKS = [ 'core/categories', 'core/paragraph', 'core/social-link', 'core/navigation', 'core/navigation-submenu', 'core/home-link', 'core/navigation-link', 'core/category', 'core/spacer', 'core/social-links', 'core/search', 'core/loginout' ];
const TEMPLATE = [
	[ 'core/loginout', {} ],
	[ 'core/categories', {} ]
  ];

registerBlockType( metadata.name, {
	
    edit: ({ attributes, setAttributes }) => {
		const { backgroundColor, iconColor, style, sidebarSide } = attributes;
		const blockProps = useBlockProps();

		if (blockProps.className) {
			blockProps.className = blockProps.className
				.split(' ')
				.filter(className => {
					return className !== 'has-background' && !className.match(/has-([\w-]+)-background-color/);
				})
				.join(' ');
		}
		
		if (blockProps.style && blockProps.style.backgroundColor) {
			delete blockProps.style.backgroundColor;
		}

        return (
            <div { ...blockProps }>
				<InspectorControls>					
					<SelectControl
                            label="Sidebar Side"
                            value={ sidebarSide }
                            options={ [
                                { label: 'Left', value: 'left' },
                                { label: 'Right', value: 'right' }
                            ] }
                            onChange={ ( value ) => {
                                setAttributes({ sidebarSide: value });
                            } }
                        />
					<PanelBody title="Button Color" initialOpen={ true }>
						<ColorPicker
							color={iconColor}
							onChangeComplete={(value) => setAttributes({ iconColor: `rgba(${ value.rgb.r }, ${ value.rgb.g }, ${ value.rgb.b }, ${ value.rgb.a })` })}
							/>
					</PanelBody>
				</InspectorControls>
				<button className="ws-menu-toggle" aria-expanded="true">
					<div className="ws-hbicon-part1" style={{ backgroundColor: iconColor }}></div>
					<div className="ws-hbicon-part2" style={{ backgroundColor: iconColor }}></div>
					<div className="ws-hbicon-part3" style={{ backgroundColor: iconColor }}></div>
					<div className="ws-hbmenu-spacer"></div>
				</button>
				<ul 
				 className={`ws-sidebar-content ws-sidebar-${sidebarSide} ${backgroundColor ? ` has-${backgroundColor}-background-color` : ''}`}
				 style={{ 
					backgroundColor: style?.color?.background
				 }}
				 aria-hidden="false">
                	<InnerBlocks 
						allowedBlocks={ ALLOWED_BLOCKS }
						template={ TEMPLATE }
						/>
				</ul>
            </div>
        );
    },

    save: ({ attributes }) => {
        const blockProps = useBlockProps.save();
		const { backgroundColor, style, iconColor, sidebarSide } = attributes;

		if (blockProps.className) {
			blockProps.className = blockProps.className
				.split(' ')
				.filter(className => {
					return className !== 'has-background' && !className.match(/has-([\w-]+)-background-color/);
				})
				.join(' ');
		}
		
		if (blockProps.style && blockProps.style.backgroundColor) {
			delete blockProps.style.backgroundColor;
		}

        return (
            <div { ...blockProps }>
				<button className="ws-menu-toggle" aria-expanded="false">
					<div className="ws-hbicon-part1" style={{ backgroundColor: iconColor }}></div>
					<div className="ws-hbicon-part2" style={{ backgroundColor: iconColor }}></div>
					<div className="ws-hbicon-part3" style={{ backgroundColor: iconColor }}></div>
					<div className="ws-hbmenu-spacer"></div>
				</button>
				<ul 
				 className={`ws-sidebar-content ws-sidebar-${sidebarSide} ${backgroundColor ? ` has-${backgroundColor}-background-color` : ''}`}
				 style={{ 
					backgroundColor: style?.color?.background
				 }}
				 aria-hidden="false">
                	<InnerBlocks.Content />
				</ul>
            </div>
        );
    },
} );